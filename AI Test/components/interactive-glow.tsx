"use client"

import { useInteractiveGlow } from "@/lib/use-interactive-glow"

function getGlowRadius(w: number, h: number): number {
  const minDim = Math.min(w, h)
  if (minDim >= 300) return 200
  if (minDim >= 150) return 160
  return 120
}

export default function InteractiveGlow() {
  const { glowTarget, mouseX, mouseY, bounds, borderRadius } = useInteractiveGlow()

  const clipPath = bounds
    ? `inset(${bounds.top}px ${window.innerWidth - bounds.right}px ${window.innerHeight - bounds.bottom}px ${bounds.left}px round ${borderRadius})`
    : "none"

  const glowRadius = bounds
    ? getGlowRadius(bounds.right - bounds.left, bounds.bottom - bounds.top)
    : 120

  const backgroundImage = bounds
    ? `radial-gradient(${glowRadius}px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.12), transparent)`
    : "none"

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        opacity: glowTarget ? 1 : 0,
        clipPath,
        backgroundImage,
        transition: "opacity 0.2s ease",
      }}
    />
  )
}
