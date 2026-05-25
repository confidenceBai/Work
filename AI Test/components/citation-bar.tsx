"use client"

import type { ReactNode } from "react"
import { colors } from "@/lib/design-tokens"

export default function CitationBar({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
      <div style={{ width: 2, backgroundColor: colors.dark[50], borderRadius: 1, flexShrink: 0 }} />
      <div style={{ margin: 0, width: "100%" }}>{children}</div>
    </div>
  )
}
