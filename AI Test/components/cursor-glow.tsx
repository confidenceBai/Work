"use client"

import { glow } from "@/lib/design-tokens"

interface CursorGlowProps {
  visible: boolean
}

export default function CursorGlow({ visible }: CursorGlowProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        borderRadius: "inherit",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        boxShadow: visible
          ? `inset 0 0 0 1px rgba(255,255,255,0.1), ${glow.shadowHover}`
          : `inset 0 0 0 1px rgba(255,255,255,0.06), ${glow.shadow}`,
        transition: `${glow.transition}, box-shadow 0.3s ease`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${glow.radius}px circle at var(--glow-x) var(--glow-y), ${glow.color}, transparent)`,
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  )
}
