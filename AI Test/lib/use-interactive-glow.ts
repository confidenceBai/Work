"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  '[role="button"]',
  'input:not([type="hidden"])',
  "select",
  "textarea",
  "label",
  "summary",
  '[tabindex]:not([tabindex="-1"])',
].join(", ")

interface Bounds {
  top: number
  left: number
  right: number
  bottom: number
}

export function useInteractiveGlow() {
  const pathname = usePathname()
  const [glowTarget, setGlowTarget] = useState<Element | null>(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [bounds, setBounds] = useState<Bounds | null>(null)
  const [borderRadius, setBorderRadius] = useState("0px")

  const glowTargetRef = useRef<Element | null>(null)
  const boundsRef = useRef<Bounds | null>(null)
  const rafIdRef = useRef(0)

  // 路由变化时清除光晕状态
  useEffect(() => {
    glowTargetRef.current = null
    boundsRef.current = null
    setGlowTarget(null)
    setBounds(null)
    setMouseX(0)
    setMouseY(0)
  }, [pathname])

  useEffect(() => {
    function findInteractiveAt(x: number, y: number): Element | null {
      const el = document.elementFromPoint(x, y)
      if (!el) return null
      const interactive = el.closest(INTERACTIVE_SELECTOR)
      if (interactive && interactive.hasAttribute('data-no-glow')) return null
      return interactive
    }

    function updateTarget(el: Element) {
      const rect = el.getBoundingClientRect()
      boundsRef.current = rect
      glowTargetRef.current = el
      const cs = window.getComputedStyle(el)
      setGlowTarget(el)
      setBounds(rect)
      setBorderRadius(cs.borderRadius)
    }

    function clearTarget() {
      glowTargetRef.current = null
      boundsRef.current = null
      setGlowTarget(null)
      setBounds(null)
    }

    function onMouseMove(e: MouseEvent) {
      if (rafIdRef.current) return
      const x = e.clientX
      const y = e.clientY
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = 0
        const target = glowTargetRef.current
        if (target && target.isConnected && !target.hasAttribute('data-no-glow')) {
          const b = boundsRef.current!
          if (y >= b.top && y <= b.bottom && x >= b.left && x <= b.right) {
            setMouseX(x)
            setMouseY(y)
            return
          }
        }
        const newTarget = findInteractiveAt(x, y)
        if (newTarget) {
          updateTarget(newTarget)
          setMouseX(x)
          setMouseY(y)
        } else {
          clearTarget()
        }
      })
    }

    function onScroll() {
      const target = glowTargetRef.current
      if (!target || !target.isConnected) return
      const rect = target.getBoundingClientRect()
      boundsRef.current = rect
      setBounds(rect)
    }

    function onClick() {
      glowTargetRef.current = null
      boundsRef.current = null
      setGlowTarget(null)
      setBounds(null)
    }

    document.addEventListener("mousemove", onMouseMove, { passive: true })
    document.addEventListener("click", onClick, { passive: true })
    document.addEventListener("scroll", onScroll, { passive: true, capture: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("click", onClick)
      document.removeEventListener("scroll", onScroll, { capture: true })
      window.removeEventListener("resize", onScroll)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  return { glowTarget, mouseX, mouseY, bounds, borderRadius }
}
