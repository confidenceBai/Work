"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { motion } from "framer-motion"
import { CopyIcon, CheckIcon } from "@phosphor-icons/react"
import styles from "./markdown-content.module.css"

const PROJECT_SLUGS: Record<string, string> = {
  "人事系统": "/work/fm",
  "美图秀秀Pro": "/work/meitu-pro",
  "WaveRooms": "/work/wave-rooms",
  "米哈游抽奖系统": "/work/lottery",
  "HoYoWave": "/work/hoyowave",
  "ComponentChecker": "/work/component-checker",
}

interface MarkdownContentProps {
  children: string
  showCursor?: boolean
}

function CodeBlock({ className, children }: { className?: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    const text = typeof children === "string" ? children : String(children)
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [children])

  return (
    <>
      <button className={styles.copyBtn} onClick={handleCopy} type="button">
        {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
        {copied ? "已复制" : "复制"}
      </button>
      <code className={className}>{children}</code>
    </>
  )
}

export default function MarkdownContent({ children, showCursor }: MarkdownContentProps) {
  const isThinking = showCursor && !children
  // Debug: log raw AI output to see exact format
  if (children && children.includes("项目")) {
    console.log("[MarkdownContent] raw:", JSON.stringify(children.slice(0, 300)))
  }
  // Handle multiple AI output variations:
  //   [项目:xxx]              — plain
  //   [项目:xxx](url)         — AI added a URL
  //   **[项目:xxx]**          — bold wrapped
  //   **[项目:xxx](url)**     — bold + URL
  const processed = children.replace(
    /\*{0,2}\[(?:project|项目):([^\]]+)\]\([^)]*\)\*{0,2}|\*{0,2}\[(?:project|项目):([^\]]+)\]\*{0,2}/g,
    (_match, slug1, slug2) => {
      const slug = slug1 || slug2
      return slug ? `[项目:${slug}](project:${slug})` : _match
    }
  )

  return (
    <div className={styles.markdown}>
      {isThinking ? (
        <div className={styles.thinkingDots}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
      ) : (
        <>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
            components={{
              code({ className, children, ...props }) {
                const isBlock = className?.includes("language-")
                if (isBlock) {
                  return <CodeBlock className={className}>{children}</CodeBlock>
                }
                return <code className={className} {...props}>{children}</code>
              },
              a({ href, children, node: _node, ...props }) {
                // Debug: log raw link data to console
                if (typeof children === "string" && children.startsWith("项目")) {
                  console.log("[MarkdownContent] project link:", { href, children })
                }
                // Handle project: protocol links (from our regex transformation)
                if (href?.startsWith("project:")) {
                  const slug = href.slice(8)
                  const path = PROJECT_SLUGS[slug]
                  if (path) {
                    return (
                      <Link href={path} className={props.className}>
                        {slug}
                      </Link>
                    )
                  }
                  return <span>{slug}</span>
                }

                // Fallback: AI might output [项目:xxx](some-real-url)
                // Detect by checking if the rendered text starts with "项目:"
                const text = typeof children === "string" ? children : ""
                const projectMatch = text.match(/^项目[:：](.+)$/)
                if (projectMatch) {
                  const slug = projectMatch[1]
                  const path = PROJECT_SLUGS[slug]
                  if (path) {
                    return (
                      <Link href={path} className={props.className}>
                        {slug}
                      </Link>
                    )
                  }
                }

                return (
                  <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                    {children}
                  </a>
                )
              },
            }}
          >
            {processed}
          </ReactMarkdown>
          {showCursor && (
            <motion.span
              animate={{ opacity: [0.3, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              className={styles.cursor}
            >
              ▎
            </motion.span>
          )}
        </>
      )}
    </div>
  )
}
