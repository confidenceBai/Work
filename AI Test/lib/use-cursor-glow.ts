"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface CursorGlowConfig {
  glowRadius?: number
  glowColor?: string
}

export function useCursorGlow(config?: CursorGlowConfig & { enabled?: boolean }) {
  const enabled = config?.enabled ?? true
  const [glowVisible, setGlowVisible] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  // 用 ref 存储 handler，保证引用稳定
  const handlersRef = useRef({
    onEnter: () => setGlowVisible(true),
    onMove: (e: MouseEvent) => {
      const el = elementRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`)
      el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`)
    },
    onLeave: () => setGlowVisible(false),
  })

  // enabled 变化时清理
  useEffect(() => {
    if (!enabled && elementRef.current) {
      const el = elementRef.current
      const h = handlersRef.current
      el.removeEventListener("mouseenter", h.onEnter)
      el.removeEventListener("mousemove", h.onMove)
      el.removeEventListener("mouseleave", h.onLeave)
      el.style.removeProperty("--glow-x")
      el.style.removeProperty("--glow-y")
      setGlowVisible(false)
    }
  }, [enabled])

  const ref = useCallback((node: HTMLElement | null) => {
    // 清理旧节点
    if (elementRef.current) {
      const el = elementRef.current
      const h = handlersRef.current
      el.removeEventListener("mouseenter", h.onEnter)
      el.removeEventListener("mousemove", h.onMove)
      el.removeEventListener("mouseleave", h.onLeave)
    }

    elementRef.current = node

    // 绑定新节点
    if (node && enabled) {
      const h = handlersRef.current
      node.addEventListener("mouseenter", h.onEnter)
      node.addEventListener("mousemove", h.onMove)
      node.addEventListener("mouseleave", h.onLeave)
    }
  }, [enabled])

  return { ref, glowVisible }
}
