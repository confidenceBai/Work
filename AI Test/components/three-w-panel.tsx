"use client"

import { useState, Fragment, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { colors, fonts } from "@/lib/design-tokens"
import { useCursorGlow } from "@/lib/use-cursor-glow"
import FlowingBorder from "@/components/flowing-border"
import styles from "./three-w-panel.module.css"

export interface ThreeWTab {
  key: string
  label: string
  subtitle?: string
}

export interface ThreeWSection {
  title: string
  titleClassName?: string
  titleAlign?: "left" | "center" | "right"
  body: ReactNode
  imageSrc?: string
  imageAlt?: string
  imageWidth?: number
  imageAfterBody?: boolean
  noMaxHeight?: boolean
  gap?: number
  layout?: "column" | "row"
}

interface ThreeWPanelProps {
  tabs: ThreeWTab[]
  defaultTabKey: string
  sectionsByTab: Record<string, ThreeWSection[]>

  activeTabKey?: string
  onTabChange?: (key: string) => void
  children?: ReactNode
}

function TabButton({
  tab,
  isActive,
  onClick,
}: {
  tab: ThreeWTab
  isActive: boolean
  onClick: () => void
}) {
  const { ref, glowVisible } = useCursorGlow({ enabled: !isActive })

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`${styles.tab} ${isActive ? styles.tabSelected : styles.tabDefault}`}
      {...(isActive ? { 'data-no-glow': '' } : {})}
    >
      {!isActive && <FlowingBorder visible={glowVisible} backgroundColor={colors.dark[500]} radius={200} />}
      <p
        style={{
          margin: 0,
          fontFamily: fonts.sans,
          fontWeight: 500,
          fontSize: 28,
          lineHeight: "1.2em",
          color: colors.neutral[50],
          position: "relative",
          zIndex: 1,
          transform: isActive ? "translateY(0)" : "translateY(8px)",
          transition: "transform 300ms ease",
        }}
      >
        {tab.label}
      </p>
      {tab.subtitle && (
        <p
          style={{
            margin: 0,
            fontFamily: fonts.sans,
            fontSize: 14,
            lineHeight: "16px",
            color: colors.neutral[600],
            textAlign: "center",
            marginTop: 4,
            position: "relative",
            zIndex: 1,
            opacity: isActive ? 1 : 0,
            transition: "opacity 300ms ease",
          }}
        >
          {tab.subtitle}
        </p>
      )}
    </button>
  )
}

export default function ThreeWPanel({
  tabs,
  defaultTabKey,
  sectionsByTab,
  activeTabKey: controlledTabKey,
  onTabChange,
  children,
}: ThreeWPanelProps) {
  const [internalTabKey, setInternalTabKey] = useState(defaultTabKey)
  const activeTabKey = controlledTabKey ?? internalTabKey
  const sections = sectionsByTab[activeTabKey] ?? []

  const handleTabChange = (key: string) => {
    if (onTabChange) onTabChange(key)
    else setInternalTabKey(key)
  }

  return (
    <section
      style={{
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeTabKey

          return (
            <TabButton
              key={tab.key}
              tab={tab}
              isActive={isActive}
              onClick={() => handleTabChange(tab.key)}
            />
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTabKey}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          {sections.map((section, index) => (
            <Fragment key={index}>
              {(section.title || section.body) && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: section.layout === "row" ? undefined : "column",
                    gap: section.gap ?? 8,
                    ...(section.layout === "row" ? { alignItems: "flex-start" } : {}),
                  }}
                >
                  {section.title && (
                    <p
                      className={section.titleClassName ?? "text-body-medium"}
                      style={{
                        margin: 0,
                        textAlign: section.titleAlign ?? "left",
                        ...(section.layout === "row" ? { width: "25%", minWidth: 90, flexShrink: 0 } : {}),
                      }}
                    >
                      {section.title}
                    </p>
                  )}

                  {section.body && section.body}
                </div>
              )}

              {section.imageSrc && section.imageAfterBody && (
                <div
                  style={{
                    maxHeight: section.noMaxHeight ? undefined : 520,
                    borderRadius: 12,
                    overflow: "auto",
                    margin: 12,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={section.imageSrc}
                    alt={section.imageAlt ?? section.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 12,
                      display: "block",
                    }}
                  />
                </div>
              )}
            </Fragment>
          ))}

          {sections.some((s) => s.imageSrc && !s.imageAfterBody) && (
            <>
              {sections
                .filter((s) => s.imageSrc && !s.imageAfterBody)
                .map((section, index) => (
                  <div
                    key={`img-${index}`}
                    style={{
                      width: "100%",
                      height: 520,
                      borderRadius: 12,
                      border: "1px solid rgba(99, 99, 121, 0.6)",
                      overflowX: "auto",
                      overflowY: "auto",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={section.imageSrc}
                      alt={section.imageAlt ?? section.title}
                      style={{
                        width: section.imageWidth ?? "100%",
                        maxWidth: "none",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 0,
                        display: "block",
                      }}
                    />
                  </div>
                ))}
            </>
          )}

          {children}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
