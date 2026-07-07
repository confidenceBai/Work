"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { XIcon, ArrowUpIcon } from "@phosphor-icons/react"
import GradientSparkleIcon from "@/components/gradient-sparkle-icon"
import { useChat } from "@/lib/chat-context"
import { colors, fonts, text } from "@/lib/design-tokens"
import MarkdownContent from "@/components/markdown-content"
import { getSuggestedQuestions } from "@/lib/suggested-questions"

export default function ChatBottomSheet() {
  const { isOpen, setOpen, messages, isStreaming, error, sendMessage } = useChat()
  const pathname = usePathname()
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const shouldAutoScroll = useRef(true)

  const suggestedQuestions = useMemo(
    () => getSuggestedQuestions(pathname, messages.length),
    [pathname, messages.length]
  )

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
    if (textareaRef.current) textareaRef.current.style.height = "auto"
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 99,
            }}
          />

          {/* Sheet */}
          <motion.div
            data-sheet
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              bottom: 0,
              height: "92vh",
              left: 0,
              right: 0,
              zIndex: 100,
              backgroundColor: "rgba(31, 33, 38, 0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              border: `1px solid ${colors.neutral[600]}`,
              borderBottom: "none",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* AI glow */}
            <div className="ai-glow-overlay">
              <div className="ai-glow-blob ai-glow-blob--1" />
              <div className="ai-glow-blob ai-glow-blob--2" />
              <div className="ai-glow-blob ai-glow-blob--3" />
              <div className="ai-glow-blob ai-glow-blob--4" />
            </div>

            {/* Header */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  padding: "16px 16px 12px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                  <GradientSparkleIcon size={20} />
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
                <motion.div
                  onPointerDown={(e) => e.stopPropagation()}
                  onTap={(e) => {
                    e.stopPropagation()
                    setOpen(false)
                  }}
                  role="button"
                  aria-label="关闭"
                  data-no-glow
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <XIcon size={20} color={colors.neutral[400]} />
                </motion.div>
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
                padding: "0 16px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Welcome */}
              {messages.length === 0 && (
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
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
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontFamily: fonts.sans,
                      fontSize: 14,
                      color: "#FF9191",
                    }}
                  >
                    {error}
                  </p>
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
                    WebkitAppearance: "none",
                    appearance: "none",
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
