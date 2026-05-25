"use client"

import { type ReactNode } from "react"
import { colors } from "@/lib/design-tokens"

export interface WhatStep {
  title: string
  body: ReactNode
  image?: WhatImage
}

export interface WhatImage {
  src: string
  alt?: string
  width?: number | string
  height?: number
  minWidth?: number
}

interface WhatStepSectionProps {
  steps: WhatStep[]
}

export default function WhatStepSection({ steps }: WhatStepSectionProps) {
  return (
    <section
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {steps.map((step, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h4 className="text-body-medium" style={{ margin: 0 }}>
              {step.title}
            </h4>
            <p className="text-body" style={{ margin: 0, width: "100%", maxWidth: 846 }}>
              {step.body}
            </p>
          </div>
          {step.image && (
            <div
              style={{
                width: "100%",
                borderRadius: 12,
                border: "1px solid rgba(99, 99, 121, 0.6)",
                overflow: "auto",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={step.image.src}
                alt={step.image.alt ?? ""}
                style={{
                  width: step.image.width ?? (step.image.height ? "auto" : "100%"),
                  height: step.image.height ?? "auto",
                  minWidth: step.image.minWidth ?? step.image.width,
                  display: "block",
                }}
              />
            </div>
          )}
        </div>
      ))}
    </section>
  )
}
