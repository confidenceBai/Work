"use client"

import { createContext, useContext, useState, useRef, useEffect, useCallback, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { streamChat } from "./chat-api"

const STORAGE_KEY_OPEN = "zoe-chat-open"

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

interface ChatContextValue {
  isOpen: boolean
  toggleOpen: () => void
  setOpen: (open: boolean) => void
  messages: ChatMessage[]
  isStreaming: boolean
  error: string | null
  sendMessage: (content: string) => void
  retryLastMessage: () => void
  clearMessages: () => void
  unreadCount: number
}

const ChatContext = createContext<ChatContextValue | null>(null)

let messageIdCounter = 0
function nextId() {
  return `msg-${++messageIdCounter}-${Date.now()}`
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(() => loadFromStorage(STORAGE_KEY_OPEN, false))
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_OPEN, JSON.stringify(isOpen))
  }, [isOpen])

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) setUnreadCount(0)
      return !prev
    })
  }, [])

  const setOpen = useCallback((open: boolean) => {
    setIsOpen(open)
    if (open) setUnreadCount(0)
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim()
      if (!trimmed || isStreaming) return

      setError(null)

      const userMessage: ChatMessage = {
        id: nextId(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      }

      const assistantMessage: ChatMessage = {
        id: nextId(),
        role: "assistant",
        content: "",
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, userMessage, assistantMessage])
      setIsStreaming(true)

      const abortController = new AbortController()
      abortRef.current = abortController

      try {
        const historyForApi = [...messages, userMessage].map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }))

        let accumulated = ""
        let rafId: number | null = null

        const flushToState = () => {
          setMessages((prev) => {
            const last = prev[prev.length - 1]
            if (last && last.role === "assistant") {
              return [
                ...prev.slice(0, -1),
                { ...last, content: accumulated },
              ]
            }
            return prev
          })
          rafId = null
        }

        for await (const delta of streamChat(historyForApi, pathname)) {
          if (abortController.signal.aborted) break
          accumulated += delta
          if (rafId === null) {
            rafId = requestAnimationFrame(flushToState)
          }
        }

        // final flush
        if (rafId !== null) cancelAnimationFrame(rafId)
        flushToState()

        if (!isOpen) {
          setUnreadCount((prev) => prev + 1)
        }
      } catch (err) {
        if (abortController.signal.aborted) return
        const errorMsg = err instanceof Error ? err.message : "请求失败，请稍后重试"
        setError(errorMsg)
        // remove empty assistant message on error
        setMessages((prev) => {
          const last = prev[prev.length - 1]
          if (last && last.role === "assistant" && !last.content) {
            return prev.slice(0, -1)
          }
          return prev
        })
      } finally {
        setIsStreaming(false)
        abortRef.current = null
      }
    },
    [messages, isStreaming, isOpen, pathname]
  )

  const retryLastMessage = useCallback(() => {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")
    if (!lastUserMessage || isStreaming) return
    // Remove the last assistant message if it's empty (error case)
    setMessages((prev) => {
      const last = prev[prev.length - 1]
      if (last && last.role === "assistant" && !last.content) {
        return prev.slice(0, -1)
      }
      return prev
    })
    setError(null)
    sendMessage(lastUserMessage.content)
  }, [messages, isStreaming, sendMessage])

  const clearMessages = useCallback(() => {
    abortRef.current?.abort()
    setMessages([])
    setError(null)
    setIsStreaming(false)
  }, [])

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        toggleOpen,
        setOpen,
        messages,
        isStreaming,
        error,
        sendMessage,
        retryLastMessage,
        clearMessages,
        unreadCount,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error("useChat must be used within ChatProvider")
  return ctx
}
