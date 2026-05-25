"use client"

import { flowingBorder } from "@/lib/design-tokens"

interface FlowingBorderProps {
  visible: boolean
  backgroundColor?: string
  borderWidth?: number
  radius?: number
}

export default function FlowingBorder({
  visible,
  backgroundColor = "rgb(31, 33, 38)",
  borderWidth = flowingBorder.width,
  radius = flowingBorder.radius,
}: FlowingBorderProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        borderRadius: "inherit",
        opacity: visible ? 1 : 0,
        transition: flowingBorder.transition,
        background: `radial-gradient(circle ${radius}px at var(--glow-x) var(--glow-y), ${flowingBorder.color}, ${flowingBorder.colorTransparent})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: borderWidth,
          borderRadius: "inherit",
          background: backgroundColor,
        }}
      />
    </div>
  )
}
