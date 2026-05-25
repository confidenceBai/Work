"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { colors, fonts, text, styles } from "@/lib/design-tokens"
import { WORKS } from "@/lib/works-data"
import { useCursorGlow } from "@/lib/use-cursor-glow"
import CursorGlow from "@/components/cursor-glow"
import FlowingBorder from "@/components/flowing-border"

const MotionLink = motion(Link)

interface OtherProjectCardProps {
  href: string
  imageSrc?: string
  title?: string
}

function OtherProjectCard({ href, imageSrc, title }: OtherProjectCardProps) {
  const { ref, glowVisible } = useCursorGlow()

  return (
    <MotionLink
      ref={ref}
      href={href}
      whileHover="hover"
      transition={{ duration: 0.2 }}
      style={{
        boxSizing: "border-box",
        display: "block",
        position: "relative",
        width: "100%",
        height: 221,
        backgroundColor: colors.dark[500],
        borderRadius: 12,
        borderTop: `1px solid ${colors.dark[400]}`,
        borderLeft: `1px solid ${colors.dark[400]}`,
        padding: 12,
        textDecoration: "none",
        overflow: "visible",
      }}
    >
      <CursorGlow visible={glowVisible} />
      <FlowingBorder visible={glowVisible} backgroundColor={colors.dark[500]} radius={160} />
      <motion.div
        style={{
          position: "absolute",
          inset: 12,
          borderRadius: 4,
          overflow: "hidden",
          transform: "translateZ(0)",
          backgroundColor: colors.dark[500],
          clipPath: "inset(0 round 4px)",
        }}
        variants={{ hover: { filter: "blur(10px)" } }}
        transition={{ duration: 0.3 }}
      >
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={title ?? ""}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 3,
              WebkitMaskImage:
                "linear-gradient(7deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.60942) 25%, rgba(0,0,0,0.86522) 50%, rgba(0,0,0,1) 100%)",
              maskImage:
                "linear-gradient(7deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.60942) 25%, rgba(0,0,0,0.86522) 50%, rgba(0,0,0,1) 100%)",
            }}
          />
        ) : null}
      </motion.div>

      <motion.span
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          zIndex: 1,
          fontFamily: fonts.sans,
          fontSize: text.h4.fontSize,
          fontWeight: text.h4.fontWeight,
          lineHeight: text.h4.lineHeight,
          color: colors.neutral[50],
          whiteSpace: "nowrap",
        }}
        variants={{ hover: { opacity: 0 } }}
        transition={{ duration: 0.2 }}
      >
        {title ?? "项目名称"}
      </motion.span>

      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          zIndex: 2,
          opacity: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "14px 20px",
          backgroundColor: colors.dark[700],
          borderRadius: 36,
          border: `1px solid ${colors.dark[500]}`,
          fontFamily: fonts.sans,
          fontSize: text.body.fontSize,
          lineHeight: text.body.lineHeight,
          fontWeight: text.body.fontWeight,
          color: colors.neutral[50],
          whiteSpace: "nowrap",
        }}
        variants={{ hover: { opacity: 1 } }}
        transition={{ duration: 0.2 }}
      >
        查看详情
      </motion.div>
    </MotionLink>
  )
}

interface OtherProjectsProps {
  currentSlug: string
}

export default function OtherProjects({ currentSlug }: OtherProjectsProps) {
  const otherWorks = WORKS.filter((w) => w.href !== currentSlug).slice(0, 4)
  return (
    <article
      style={{
        ...styles.card,
        maxWidth: 666,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <p
        style={{
          margin: 0,
          width: "100%",
          fontFamily: fonts.sans,
          fontSize: text.label.fontSize,
          lineHeight: text.label.lineHeight,
          fontWeight: text.label.fontWeight,
          letterSpacing: text.label.letterSpacing,
          textTransform: "uppercase",
          color: colors.neutral[50],
        }}
      >
        其他项目
      </p>
      <div
        className="other-projects-grid"
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}
      >
        {otherWorks.map((work) => (
          <OtherProjectCard
            key={work.href}
            href={work.href}
            imageSrc={work.imageSrc}
            title={work.title}
          />
        ))}
      </div>
    </article>
  )
}
