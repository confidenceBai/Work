"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  HouseSimpleIcon,
  ToolboxIcon,
  UserIcon,
  ChatCircleIcon,
} from "@phosphor-icons/react"
import { colors } from "@/lib/design-tokens"
import GradientSparkleIcon from "@/components/gradient-sparkle-icon"
import { useChat } from "@/lib/chat-context"

const NAV_ITEMS = [
  { label: "主页",     icon: HouseSimpleIcon, href: "/" },
  { label: "项目",     icon: ToolboxIcon,     href: "/work" },
  { label: "关于我",   icon: UserIcon,        href: "/about-us" },
  { label: "与我联系", icon: ChatCircleIcon,  href: "/contact" },
]

// padding:8 + icon:48 + gap:4 per step
const HIGHLIGHT_POSITIONS = [8, 60, 112, 164]
const HIGHLIGHT_POSITIONS_WITH_AI = [8, 60, 112, 164, 216]

export default function Navigation() {
  const pathname = usePathname()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [aiHovered, setAiHovered] = useState(false)
  const aiHoverTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [isMobile, setIsMobile] = useState(false)
  const { toggleOpen, isOpen, unreadCount } = useChat()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const activeIndex = NAV_ITEMS.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  )
  const positions = isMobile ? HIGHLIGHT_POSITIONS_WITH_AI : HIGHLIGHT_POSITIONS
  const highlightLeft = positions[activeIndex] ?? positions[0]

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 106,
          zIndex: 49,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          display: "flex",
          flexDirection: "row",
          gap: 9,
          alignItems: "center",
        }}
      >
      <nav
      style={{
        position: "relative",
        backgroundColor: "rgb(21, 22, 26)",
        borderRadius: 80,
        borderTop: `2px solid ${colors.dark[700]}`,
        borderLeft: `2px solid ${colors.dark[700]}`,
        borderRight: `1px solid ${colors.dark[700]}`,
        borderBottom: `1px solid ${colors.dark[700]}`,
        boxShadow: "inset 0px 1px 0px 0px rgba(255, 255, 255, 0.04), inset 0px -1px 0px 0px rgba(0, 0, 0, 0.25), 0px 8px 24px 0px rgba(14, 15, 16, 0.5)",
        padding: 8,
        display: "flex",
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
      }}
    >
      <motion.div
        animate={{ left: highlightLeft }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position: "absolute",
          width: 48,
          top: 8,
          bottom: 8,
          borderRadius: 32,
          backgroundColor: colors.dark[400],
          borderTop: `1px solid ${colors.dark[50]}`,
          borderLeft: `1px solid ${colors.dark[50]}`,
          borderRight: "none",
          borderBottom: "none",
        }}
      />

      {NAV_ITEMS.map((item, i) => {
        const isActive = i === activeIndex
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            onMouseEnter={() => {
              hoverTimeout.current = setTimeout(() => setHoveredIndex(i), 150)
            }}
            onMouseLeave={() => {
              if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
              setHoveredIndex(null)
            }}
            onFocus={() => setHoveredIndex(i)}
            onBlur={() => setHoveredIndex(null)}
            style={{
              position: "relative",
              zIndex: 1,
              width: 48,
              height: 48,
              borderRadius: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <Icon
              size={20}
              weight="fill"
              color={isActive ? colors.neutral[50] : colors.neutral[400]}
            />
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute",
                    bottom: "100%",
                    marginBottom: 20,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      backgroundColor: colors.dark[600],
                      borderRadius: 14,
                      borderTop: `1px solid ${colors.dark[50]}`,
                      padding: "6px 10px",
                      fontFamily: "'InterDisplay', 'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: "1.5em",
                      color: colors.neutral[50],
                    }}
                  >
                    {item.label}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        )
      })}

      {/* Mobile AI button as 5th nav item */}
      {isMobile && (
        <div
          onClick={toggleOpen}
          style={{
            position: "relative",
            zIndex: 1,
            width: 48,
            height: 48,
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          role="button"
          aria-label="AI 问答"
        >
          <span style={{ filter: isOpen ? "brightness(1.3)" : "none", transition: "filter 0.15s ease", display: "flex" }}>
            <GradientSparkleIcon size={20} />
          </span>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#FF9191",
              }}
            />
          )}
        </div>
      )}
    </nav>

    {/* Desktop AI pill */}
    {!isMobile && (
      <nav
        aria-label="AI 助手"
        style={{
          position: "relative",
          backgroundColor: "rgb(21, 22, 26)",
          borderRadius: 80,
          borderTop: `2px solid ${colors.dark[700]}`,
          borderLeft: `2px solid ${colors.dark[700]}`,
          borderRight: `1px solid ${colors.dark[700]}`,
          borderBottom: `1px solid ${colors.dark[700]}`,
          zIndex: 10,
          overflow: "visible",
          padding: 8,
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
        }}
      >
        <div
          onClick={toggleOpen}
          onMouseEnter={() => {
            aiHoverTimeout.current = setTimeout(() => setAiHovered(true), 150)
          }}
          onMouseLeave={() => {
            if (aiHoverTimeout.current) clearTimeout(aiHoverTimeout.current)
            setAiHovered(false)
          }}
          onFocus={() => setAiHovered(true)}
          onBlur={() => setAiHovered(false)}
          style={{
            position: "relative",
            zIndex: 1,
            width: 48,
            height: 48,
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          role="button"
          aria-label="AI 问答"
        >
          <span style={{ filter: isOpen ? "brightness(1.3)" : "none", transition: "filter 0.15s ease", display: "flex" }}>
            <GradientSparkleIcon size={20} />
          </span>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#FF9191",
              }}
            />
          )}
          <AnimatePresence>
            {aiHovered && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: "absolute",
                  bottom: "100%",
                  marginBottom: 20,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    whiteSpace: "nowrap",
                    backgroundColor: colors.dark[600],
                    borderRadius: 14,
                    borderTop: `1px solid ${colors.dark[50]}`,
                    padding: "6px 10px",
                    fontFamily: "'InterDisplay', 'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "1.5em",
                    color: colors.neutral[50],
                  }}
                >
                  AI 问答
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    )}
    </div>
    </>
  )
}
