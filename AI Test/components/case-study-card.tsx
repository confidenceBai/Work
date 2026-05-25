"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { colors, fonts, text, shadows } from "@/lib/design-tokens"
import { useCursorGlow } from "@/lib/use-cursor-glow"
import CursorGlow from "@/components/cursor-glow"
import FlowingBorder from "@/components/flowing-border"

const MotionLink = motion(Link)

interface CaseStudyCardProps {
  href: string
  imageSrc?: string
  title?: string
  height?: number
}

export default function CaseStudyCard({
  href,
  imageSrc,
  title,
  height = 500,
}: CaseStudyCardProps) {
  const { ref, glowVisible } = useCursorGlow()

  return (
    <MotionLink
      ref={ref}
      href={href}
      style={{
        boxSizing: "border-box",
        position: "relative",
        display: "block",
        width: "100%",
        height,
        borderRadius: 24,
        backgroundColor: colors.dark[700],
        borderTop: `1px solid ${colors.dark[400]}`,
        borderLeft: `1px solid ${colors.dark[400]}`,
        borderRight: "none",
        borderBottom: "none",
        // No overflow:hidden here — lets boxShadow render freely
        boxShadow: shadows.ambient8,
        textDecoration: "none",
      }}
      whileHover="hover"
      transition={{ duration: 0.2 }}
    >
      <CursorGlow visible={glowVisible} />
      <FlowingBorder visible={glowVisible} />
      {/*
        Dedicated clip container: overflow+clipPath双重裁剪，
        确保 filter:blur 不会泄漏到圆角外。
        外层卡片不设 overflow:hidden，boxShadow 才能正常渲染。
      */}
      <motion.div
        style={{
          position: "absolute",
          inset: 20,
          borderRadius: 12,
          overflow: "hidden",
          transform: "translateZ(0)",
          backgroundColor: colors.dark[500],
          clipPath: "inset(0 round 12px)",
        }}
        variants={{ hover: { filter: "blur(10px)" } }}
        transition={{ duration: 0.3 }}
      >
        {/* Image — fills clip container, scales on hover */}
        <motion.div
          style={{ position: "absolute", inset: 0 }}
          variants={{ hover: { scale: 1.1 } }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={title ?? ""}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 12,
                filter: "brightness(1)",
                WebkitMaskImage:
                  "linear-gradient(7deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.60942) 25%, rgba(0,0,0,0.86522) 50%, rgba(0,0,0,1) 100%)",
                maskImage:
                  "linear-gradient(7deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.60942) 25%, rgba(0,0,0,0.86522) 50%, rgba(0,0,0,1) 100%)",
              }}
            />
          )}
        </motion.div>

        {/* Title — inside image layer, fades out on hover */}
        <motion.span
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            zIndex: 1,
            width: "auto",
            height: "auto",
            whiteSpace: "pre",
            fontFamily: fonts.sans,
            fontSize: text.h3.fontSize,
            fontWeight: text.h3.fontWeight,
            lineHeight: 1.2,
            color: colors.neutral[50],
          }}
          variants={{ hover: { opacity: 0 } }}
          transition={{ duration: 0.2 }}
        >
          {title ?? "项目名称"}
        </motion.span>
      </motion.div>

      {/* 查看详情 button — centered, appears on hover */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          zIndex: 2,
          opacity: 0,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          flexWrap: "nowrap",
          gap: 8,
          padding: "14px 36px",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          backgroundColor: colors.dark[700],
          overflow: "hidden",
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
