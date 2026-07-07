"use client"

import type { ReactNode } from "react"

export default function HighlightText({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        backgroundImage: "linear-gradient(to right, #C4756F, #A25956)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 calc(100% - 2px)",
        backgroundSize: "100% 3px",
      }}
    >
      {children}
    </span>
  )
}
