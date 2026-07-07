"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { XIcon, ArrowUpIcon } from "@phosphor-icons/react"
import GradientSparkleIcon from "@/components/gradient-sparkle-icon"
import { useChat } from "@/lib/chat-context"
import { colors, shadows, fonts, text } from "@/lib/design-tokens"
import MarkdownContent from "@/components/markdown-content"
import { getSuggestedQuestions } from "@/lib/suggested-questions"
import ChatBottomSheet from "@/components/chat-bottom-sheet"

export default function ChatWindow() {
  const { isOpen, setOpen, messages, isStreaming, error, sendMessage, retryLastMessage } = useChat()
  const pathname = usePathname()
  const [input, setInput] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [rect, setRect] = useState({ x: 0, y: 0, width: 432, height: 620 })
  const [activeCursor, setActiveCursor] = useState<string | null>(null)

  const suggestedQuestions = useMemo(
    () => getSuggestedQuestions(pathname, messages.length),
    [pathname, messages.length]
  )

  useEffect(() => {
    setRect({
      x: window.innerWidth - 432 - 24,
      y: window.innerHeight - 620 - 100,
      width: 432,
      height: 620,
    })
  }, [])
  const resizeRef = useRef<{ startX: number; startY: number; startRect: typeof rect; edge: string } | null>(null)
  const dragRef = useRef<{ startX: number; startY: number; startRect: typeof rect } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const shouldAutoScroll = useRef(true)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // auto-scroll
  useEffect(() => {
    if (shouldAutoScroll.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleScroll = () => {
    const el = scrollContainerRef.current
    if (!el) return
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60
    shouldAutoScroll.current = isAtBottom
  }

  // textarea auto-resize
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = "auto"
    ta.style.height = Math.min(ta.scrollHeight, 80) + "px"
  }, [input])

  const handleSend = () => {
    if (!input.trim()) return
    setInput("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
    if (isStreaming) return
    sendMessage(input)
    shouldAutoScroll.current = true
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const MIN_W = 360, MIN_H = 360, MAX_W = 560, MAX_H = 880

  const edgeToCursor = (edge: string) => {
    if (edge === "n" || edge === "s") return "ns-resize"
    if (edge === "e" || edge === "w") return "ew-resize"
    const isN = edge.includes("n"), isE = edge.includes("e")
    return isN === isE ? "nesw-resize" : "nwse-resize"
  }

  const onResizeStart = (edge: string) => (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    resizeRef.current = { startX: e.clientX, startY: e.clientY, startRect: { ...rect }, edge }
    setActiveCursor(edgeToCursor(edge))
    document.body.style.userSelect = "none"
    document.addEventListener("pointermove", onResizeMove)
    document.addEventListener("pointerup", onResizeEnd)
  }

  const onResizeMove = (e: PointerEvent) => {
    const r = resizeRef.current
    if (!r) return
    const dx = e.clientX - r.startX
    const dy = e.clientY - r.startY
    const s = r.startRect
    let x = s.x, y = s.y, w = s.width, h = s.height

    if (r.edge.includes("e")) w = s.width + dx
    if (r.edge.includes("w")) { w = s.width - dx; x = s.x + dx }
    if (r.edge.includes("s")) h = s.height + dy
    if (r.edge.includes("n")) { h = s.height - dy; y = s.y + dy }

    // clamp size
    const clampedW = Math.max(MIN_W, Math.min(MAX_W, w))
    const clampedH = Math.max(MIN_H, Math.min(MAX_H, h))

    // adjust position when size was clamped (so the opposite edge stays fixed)
    if (r.edge.includes("w")) x = s.x + s.width - clampedW
    if (r.edge.includes("n")) y = s.y + s.height - clampedH

    setRect({ x, y, width: clampedW, height: clampedH })
  }

  const onResizeEnd = () => {
    resizeRef.current = null
    setActiveCursor(null)
    document.body.style.userSelect = ""
    document.removeEventListener("pointermove", onResizeMove)
    document.removeEventListener("pointerup", onResizeEnd)
  }

  const onDragStart = (e: React.PointerEvent) => {
    e.preventDefault()
    dragRef.current = { startX: e.clientX, startY: e.clientY, startRect: { ...rect } }
    setActiveCursor("grabbing")
    document.body.style.userSelect = "none"
    document.addEventListener("pointermove", onDragMove)
    document.addEventListener("pointerup", onDragEnd)
  }

  const onDragMove = (e: PointerEvent) => {
    const d = dragRef.current
    if (!d) return
    setRect(prev => ({
      ...prev,
      x: d.startRect.x + (e.clientX - d.startX),
      y: d.startRect.y + (e.clientY - d.startY),
    }))
  }

  const onDragEnd = () => {
    dragRef.current = null
    setActiveCursor(null)
    document.body.style.userSelect = ""
    document.removeEventListener("pointermove", onDragMove)
    document.removeEventListener("pointerup", onDragEnd)
  }

  if (isMobile) return <ChatBottomSheet />

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onWheel={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height,
            zIndex: 100,
            borderRadius: 24,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Inner content wrapper — clips overflow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 24,
              overflow: "hidden",
              backgroundColor: "rgba(31, 33, 38, 0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: `1px solid ${colors.neutral[600]}`,
              boxShadow: shadows.ambient8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* AI glow — top ambient light */}
            <div className="ai-glow-overlay">
              <div className="ai-glow-blob ai-glow-blob--1" />
              <div className="ai-glow-blob ai-glow-blob--2" />
              <div className="ai-glow-blob ai-glow-blob--3" />
              <div className="ai-glow-blob ai-glow-blob--4" />
            </div>

            {/* Header — drag handle */}
            <div
              onPointerDown={onDragStart}
              style={{
                padding: "16px 16px 16px 20px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                cursor: "grab",
                userSelect: "none",
                touchAction: "none",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                <h4
                  style={{
                    margin: 0,
                    fontFamily: fonts.sans,
                    fontSize: text.h4.fontSize,
                    lineHeight: text.h4.lineHeight,
                    fontWeight: text.h4.fontWeight,
                    color: colors.neutral[50],
                  }}
                >
                  Zoe 小助手
                </h4>
              </div>
              <div
                onClick={() => setOpen(false)}
                onPointerDown={(e) => e.stopPropagation()}
                role="button"
                aria-label="关闭"
                data-no-glow
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <XIcon size={20} color={colors.neutral[400]} />
              </div>
            </div>

          {/* Messages */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            style={{
              flex: 1,
              overflowY: "auto",
              overscrollBehavior: "contain",
              padding: "16px 16px 0 16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Welcome message */}
            {messages.length === 0 && (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <GradientSparkleIcon size={20} />
                </div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: fonts.sans,
                    fontSize: text.body.fontSize,
                    lineHeight: text.body.lineHeight,
                    fontWeight: text.body.fontWeight,
                    color: colors.neutral[50],
                  }}
                >
                  Hi！我是 Zoe 小助手👋 您有任何问题，我都可以帮您解答哦～
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.role === "assistant" && (
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 100,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <GradientSparkleIcon size={20} />
                  </div>
                )}
                <div
                  style={{
                    maxWidth: msg.role === "user" ? "100%" : undefined,
                    padding: msg.role === "user" ? 12 : "0 12px 12px 12px",
                    borderRadius:
                      msg.role === "user"
                        ? "12px 12px 4px 12px"
                        : "12px 12px 12px 4px",
                    backgroundColor:
                      msg.role === "user" ? colors.dark[50] : "transparent",
                    borderTop:
                      msg.role === "user" ? `1px solid ${colors.neutral[600]}` : undefined,
                    borderLeft:
                      msg.role === "user" ? `1px solid ${colors.neutral[600]}` : undefined,
                  }}
                >
                  {msg.role === "assistant" ? (
                    <MarkdownContent
                      showCursor={
                        isStreaming &&
                        msg.id === messages[messages.length - 1]?.id
                      }
                    >
                      {msg.content}
                    </MarkdownContent>
                  ) : (
                    <p
                      style={{
                        margin: 0,
                        fontFamily: fonts.sans,
                        fontSize: text.body.fontSize,
                        lineHeight: text.body.lineHeight,
                        fontWeight: text.body.fontWeight,
                        color: colors.neutral[50],
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {msg.content}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Error */}
            {error && (
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  backgroundColor: "rgba(255, 145, 145, 0.1)",
                  border: "1px solid rgba(255, 145, 145, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    flex: 1,
                    fontFamily: fonts.sans,
                    fontSize: 14,
                    color: "#FF9191",
                  }}
                >
                  {error}
                </p>
                <button
                  onClick={retryLastMessage}
                  style={{
                    border: `1px solid ${colors.dark[50]}`,
                    backgroundColor: colors.dark[500],
                    borderRadius: 8,
                    padding: "4px 10px",
                    fontFamily: fonts.sans,
                    fontSize: 12,
                    color: colors.neutral[400],
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "background-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.dark[400]
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.dark[500]
                  }}
                >
                  重试
                </button>
              </div>
            )}

            {/* Suggested Questions */}
            {suggestedQuestions.length > 0 && !isStreaming && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  padding: "4px 0 8px",
                }}
              >
                {suggestedQuestions.map((q, i) => (
                  <motion.button
                    key={q}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: i * 0.05 }}
                    onClick={() => {
                      setInput("")
                      sendMessage(q)
                    }}
                    style={{
                      border: `1px solid ${colors.dark[50]}`,
                      borderTop: `1px solid ${colors.dark[50]}`,
                      borderLeft: `1px solid ${colors.dark[50]}`,
                      backgroundColor: colors.dark[500],
                      borderRadius: 12,
                      padding: "6px 12px",
                      fontFamily: fonts.sans,
                      fontSize: 13,
                      lineHeight: "1.4em",
                      color: colors.neutral[400],
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "background-color 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.dark[400]
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.dark[500]
                    }}
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: 12, position: "relative", zIndex: 1 }}>
            <div
              style={{
                backgroundColor: "rgba(187, 187, 187, 0.15)",
                borderRadius: 16,
                padding: "8px 8px 8px 12px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="请输入问题"
                rows={1}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  fontFamily: fonts.sans,
                  fontSize: text.body.fontSize,
                  lineHeight: text.body.lineHeight,
                  color: colors.neutral[50],
                  resize: "none",
                  padding: 0,
                  maxHeight: 80,
                }}
              />
              <div
                onClick={handleSend}
                role="button"
                aria-label="发送"
                data-no-glow
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: colors.neutral[50],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: input.trim() ? "pointer" : "default",
                  opacity: input.trim() ? 1 : 0.4,
                  flexShrink: 0,
                  transition: "opacity 0.15s ease",
                }}
              >
                <ArrowUpIcon size={20} color={colors.dark[800]} weight="bold" />
              </div>
            </div>
          </div>
          </div>

          {/* Resize handles — outside overflow wrapper so negative offsets aren't clipped */}
          {["n", "s", "e", "w", "ne", "nw", "se", "sw"].map((edge) => {
            const isN = edge.includes("n"), isS = edge.includes("s")
            const isE = edge.includes("e"), isW = edge.includes("w")
            const style: React.CSSProperties = {
              position: "absolute",
              zIndex: 10,
            }
            if (edge === "n" || edge === "s") {
              Object.assign(style, { left: 0, right: 0, height: 20, cursor: "ns-resize", [isN ? "top" : "bottom"]: -10 })
            } else if (edge === "e" || edge === "w") {
              Object.assign(style, { top: 0, bottom: 0, width: 20, cursor: "ew-resize", [isE ? "right" : "left"]: -10 })
            } else {
              Object.assign(style, {
                width: 32, height: 32,
                cursor: isN === isE ? "nesw-resize" : "nwse-resize",
                [isN ? "top" : "bottom"]: -16,
                [isE ? "right" : "left"]: -16,
              })
            }
            return (
              <div
                key={edge}
                onPointerDown={onResizeStart(edge)}
                style={style}
              />
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
      {activeCursor && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, cursor: activeCursor }} />
      )}
    </>
  )
}
