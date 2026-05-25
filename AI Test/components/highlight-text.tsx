"use client"

import type { ReactNode } from "react"

export default function HighlightText({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        backgroundImage: "linear-gradient(to right, #A25956, #A2595680)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 calc(100% - 2px)",
        backgroundSize: "100% 4px",
      }}
    >
      {children}
    </span>
  )
}
