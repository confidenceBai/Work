"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { colors, styles as tokenStyles, shadows, fonts, text } from "@/lib/design-tokens"

/* ─── Section Card ─── */
function SectionCard({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <section
      className={className}
      style={{
        backgroundColor: colors.dark[700],
        borderRadius: 24,
        borderTop: `1px solid ${colors.dark[400]}`,
        borderLeft: `1px solid ${colors.dark[400]}`,
        borderRight: "none",
        borderBottom: "none",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        width: "100%",
        maxWidth: 666,
        flex: "none",
        position: "relative",
        overflow: "visible",
        boxShadow: shadows.ambient8,
        ...style,
      }}
    >
      {children}
    </section>
  )
}

/* ─── Header Section ─── */
function HeaderSection() {
  return (
    <SectionCard style={{ gap: 8, alignItems: "flex-start", padding: 24 }}>
      <h1 style={{ margin: 0, fontFamily: fonts.sans, fontSize: text.h2.fontSize, lineHeight: text.h2.lineHeight, fontWeight: text.h2.fontWeight, color: colors.neutral[50], textAlign: "left" }}>
        个人简介
      </h1>
    </SectionCard>
  )
}

/* ─── About User Section ─── */
function AboutUserSection() {
  return (
    <SectionCard style={{ alignItems: "flex-start" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
          alignItems: "stretch",
        }}
        className="about-user-layout"
      >
        {/* Profile Pic */}
        <div
          style={{
            flex: "none",
            width: "100%",
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
          }}
          className="about-user-pic"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/about-us/BJdnkVSaKuHEVB3S7uHPJok6aNA.jpeg"
            alt="a person standing in front of a brick wall"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            ...tokenStyles.subCard,
            padding: 16,
            gap: 16,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minWidth: 0,
          }}
          className="about-user-content"
        >
          <div className="text-body" style={{ margin: 0 }}>
            <p style={{ margin: 0 }}>
              HI～我叫白子煜，一名来自福建的 00 后射手座男生。
            </p>
            <br />
            <p style={{ margin: 0 }}>
              我毕业于福州大学环境设计专业。目前在米哈游企业效能组担任 UX
              设计师，有着四年的工作经验（含一年实习）
            </p>
            <br />
            <p style={{ margin: 0 }}>
              性格比较幽默（时不时喜欢搞抽象 hhh
              ）爱好健身、弹吉他、撸猫、打游戏、自驾游。
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

/* ─── Experience Entry ─── */
function ExperienceEntry({
  date,
  title,
  icon,
  description,
  image,
}: {
  date: string
  title: string
  icon?: React.ReactNode
  description: React.ReactNode
  image?: { src: string; alt?: string }
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 16,
        width: "100%",
        alignItems: "flex-start",
      }}
      className="experience-entry"
    >
      {/* Date */}
      <p
        className="text-body-medium"
        style={{
          margin: 0,
          flex: "none",
          width: 130,
          maxWidth: 130,
          color: "var(--color-neutral-300)",
        }}
      >
        {date}
      </p>

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: 2,
          minWidth: 0,
        }}
      >
        {/* Title Row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <p
            className="text-body-medium"
            style={{ margin: 0, color: "var(--color-neutral-50)" }}
          >
            {title}
          </p>
          {icon}
          {image && (
            <div
              style={{
                width: 60,
                height: 18,
                borderRadius: 4,
                overflow: "hidden",
                flex: "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt ?? ""}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div
          className="text-body"
          style={{ margin: 0, color: "var(--color-neutral-400)", width: "100%" }}
        >
          {description}
        </div>
      </div>
    </div>
  )
}

/* ─── Experiences Section ─── */
function ExperiencesSection() {
  return (
    <SectionCard>
      <h2
        className="text-capitalized"
        style={{ margin: 0, color: "var(--color-neutral-300)", textAlign: "left", width: "100%" }}
      >
        工作经历
      </h2>
      <div
        style={{
          ...tokenStyles.subCard,
          backgroundColor: colors.dark[600],
          padding: 16,
          gap: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ExperienceEntry
          date="2023 — 至今"
          title="米哈游/企业效能组 - UX 设计师"
          icon={<MihoyoLogo />}
          description={
            <ul style={{ margin: 0, paddingLeft: 20, listStyle: "disc" }}>
              <li>2025 - 2026 支持人事业务线设计工作（重点负责盘人盘事功能模块）</li>
              <li>2023 - 2025 支持 HoYoWave 线设计工作（重点负责 IM、VC、会控设备、工作台功能模块）</li>
              <li>2023 - 至今 负责团队组件维护工作</li>
            </ul>
          }
        />
        <ExperienceEntry
          date="2021 — 2022 (实习)"
          title="美图/影像设计部 - UI 设计师"
          image={{ src: "/img/about-us/aTE490vjrJaUPeQNa31D1shM188.png" }}
          description={
            <ul style={{ margin: 0, paddingLeft: 20, listStyle: "disc" }}>
              <li>负责美图秀秀 PC 项目</li>
              <li>独责美图秀秀上线支付宝小程序 UI 设计工作</li>
              <li>参与美图秀秀官网视觉改版并负责官网</li>
            </ul>
          }
        />
      </div>
    </SectionCard>
  )
}

/* ─── Process Section (Education) ─── */
function ProcessSection() {
  return (
    <SectionCard style={{ backgroundColor: colors.dark[700] }}>
      <h2
        className="text-capitalized"
        style={{ margin: 0, color: "var(--color-neutral-300)", textAlign: "left", width: "100%" }}
      >
        教育经历（本科）
      </h2>
      <div
        style={{
          backgroundColor: colors.dark[600],
          borderRadius: 12,
          borderTop: `1px solid ${colors.dark[50]}`,
          borderLeft: `1px solid ${colors.dark[50]}`,
          borderRight: "none",
          borderBottom: "none",
          padding: 16,
          gap: 20,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <ExperienceEntry
          date="2019 — 2023"
          title="福州大学 - 环境设计"
          image={{ src: "/img/about-us/LyI8o9oUU6ImUuedNTbtvIx3qgY.png" }}
          description={
            <ul style={{ margin: 0, paddingLeft: 20, listStyle: "disc" }}>
              <li>专业成绩排名 4/93（曾获校保研名额）</li>
              <li>在校期间共获：校优秀毕业生、4 次校一等奖学金、2 次校二等奖学金、2次校"三好学生"荣誉称号等等</li>
              <li>在校期间共担任过：班长、院团委宣传中心主任等职务</li>
            </ul>
          }
        />
      </div>
    </SectionCard>
  )
}

/* ─── Skills Section ─── */
const SKILLS = ["UI 设计", "交互设计", "动效设计", "3D 建模 & 渲染", "插画", "Vibe Coding"]

function SkillsSection() {
  return (
    <SectionCard>
      <h2
        className="text-capitalized"
        style={{ margin: 0, color: "var(--color-neutral-300)", textAlign: "left", width: "100%" }}
      >
        专业技能
      </h2>
      <div className="skills-grid">
        {SKILLS.map((skill) => (
          <div
            key={skill}
            style={{
              ...tokenStyles.subCard,
              padding: "12px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              className="text-body-medium"
              style={{
                margin: 0,
                textAlign: "center",
                color: "var(--color-neutral-50)",
              }}
            >
              {skill}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

/* ─── Tool Stack Section ─── */
const TOOLS = [
  { src: "/img/about-us/ksrPMTvTfzWMPbWnJeXDjTZqwfw.png", alt: "" },
  { src: "/img/about-us/g0ZEio4nurx2AG3qROOi6Y2iQg.png", alt: "" },
  { src: "/img/about-us/1YWwabH11gIYbnHLNyDW9sS8.png", alt: "" },
  { src: "/img/about-us/tPwZzZ6f6eBHpDac4BRn3S9Nfk.png", alt: "" },
  { src: "/img/about-us/5KTf4KPqEQhpCT02VC4TPkPQlUk.png", alt: "" },
  { src: "/img/about-us/XZmzew0MgiXyYKxXnUacT8sQQBI.png", alt: "" },
  { src: "/img/about-us/cj0wobBr4buBuJ026HqYOTuG8qY.png", alt: "" },
  { src: "/img/about-us/6ZTwuWOjfhlrwilx3lBLVOxYLGs.png", alt: "", fit: "cover" },
  { src: "/img/about-us/9hVtVw5uyW5n0AbHbm0J3F6FpaU.png", alt: "" },
  { src: "/img/about-us/jd9uQm8OxKsJcKIXyNmy8Jda4Q.png", alt: "" },
  { src: "/img/about-us/qudIvCU3WOeIq8neJt46lIlE.png", alt: "" },
  { src: "/img/about-us/dcot7aC4JKunflIykPpKKkeDco.png", alt: "" },
]

function ToolStackSection() {
  return (
    <SectionCard style={{ alignItems: "flex-start" }}>
      <h2
        className="text-capitalized"
        style={{ margin: 0, color: "var(--color-neutral-300)" }}
      >
        专业软件
      </h2>
      <div className="tools-grid">
        {TOOLS.map((tool, i) => (
          <div
            key={i}
            style={{
              ...tokenStyles.subCard,
              padding: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tool.src}
              alt={tool.alt}
              style={{
                display: "block",
                width: 40,
                height: 40,
                objectFit: (tool.fit as React.CSSProperties["objectFit"]) ?? "contain",
                borderRadius: 12,
              }}
            />
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

/* ─── Illustration Section ─── */
function IllustrationSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  const photos = [
    { src: "/img/个人爱好/吉他初学者.jpeg", alt: "吉他初学者", rotate: 8, zIndex: 3 },
    { src: "/img/个人爱好/奶茶爱好者.jpeg", alt: "奶茶爱好者", rotate: -8, zIndex: 2 },
    { src: "/img/个人爱好/手办收集者.png", alt: "手办收集者", rotate: -6, zIndex: 4 },
    { src: "/img/个人爱好/铲屎官.png", alt: "铲屎官", rotate: 8, zIndex: 5 },
  ]

  return (
    <div className="illustration-section">
      <div className="illustration-inner">
        {/* Photo cards */}
        {photos.map((photo, i) => (
          <div
            key={i}
            className="illustration-photo-card"
            style={{
              background: `linear-gradient(180deg, ${colors.dark[700]} 0%, ${colors.dark[800]} 100%)`,
              borderRadius: 16,
              boxShadow: shadows.ambient8,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              width: 260,
              height: 300,
              position: "absolute",
              zIndex: photo.zIndex,
              transition: "transform 0.3s ease, z-index 0s",
            }}
            onMouseEnter={() => {
              hoverTimeout.current = setTimeout(() => setHoveredIndex(i), 150)
            }}
            onMouseLeave={() => {
              if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
              setHoveredIndex(null)
            }}
          >
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
                    marginBottom: 12,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    pointerEvents: "none",
                    zIndex: 20,
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
                    {photo.alt}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div
              style={{
                borderRadius: 8,
                overflow: "hidden",
                flex: "1 0 0",
                width: "100%",
                position: "relative",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

/* ─── SVG Components ─── */
function MihoyoLogo() {
  return (
    <img
      src="/img/about-us/mihoyo.png"
      alt="miHoYo"
      style={{
        display: "inline-block",
        width: 50,
        height: 13.954,
        verticalAlign: "middle",
        flexShrink: 0,
      }}
    />
  )
}

/* ─── Page ─── */
export default function AboutUsPage() {
  return (
    <>
      <style>{`
        body { background: rgb(191, 191, 191) !important; }

        .about-us-page {
          display: flex;
          flex-flow: column;
          place-content: center flex-start;
          align-items: center;
          gap: 0;
          width: 1200px;
          margin: 0 auto;
          padding: 0;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .about-us-padding {
          padding: 160px 40px 144px 40px;
          display: flex;
          flex-flow: column;
          place-content: center flex-start;
          align-items: center;
          gap: 0;
          width: 100%;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .about-us-main {
          z-index: 4;
          display: flex;
          flex-flow: column;
          place-content: center;
          align-items: center;
          gap: 24px;
          column-gap: 24px;
          width: 100%;
          height: min-content;
          padding: 0;
          position: relative;
          overflow: visible;
        }

        /* About User layout */
        .about-user-layout {
          flex-direction: column;
        }

        .about-user-pic {
          flex: none;
          width: 100%;
          aspect-ratio: 1;
        }

        /* Skills grid */
        .skills-grid {
          display: grid;
          grid-template-rows: repeat(2, min-content);
          grid-template-columns: repeat(3, minmax(50px, 1fr));
          grid-auto-rows: min-content;
          justify-content: center;
          gap: 16px;
          width: 100%;
          padding: 0;
        }

        /* Tools grid */
        .tools-grid {
          display: grid;
          grid-template-rows: repeat(2, minmax(0, 1fr));
          grid-template-columns: repeat(4, minmax(50px, 1fr));
          grid-auto-rows: minmax(0, 1fr);
          justify-content: center;
          gap: 16px;
          width: 100%;
          padding: 0;
        }

        /* Illustration */
        .illustration-section {
          display: flex;
          flex-flow: row;
          place-content: center;
          align-items: center;
          gap: 10px;
          width: 100%;
          height: min-content;
          padding: 120px 0;
          position: relative;
          overflow: visible;
        }

        .illustration-inner {
          position: relative;
          width: 100%;
          height: 300px;
        }

        .illustration-photo-card:nth-child(1) {
          top: 81%;
          left: 35%;
          transform: translate(-50%, -50%) rotate(8deg);
        }

        .illustration-photo-card:nth-child(2) {
          top: 52%;
          left: 16%;
          transform: translate(-50%, -50%) rotate(-8deg);
        }

        .illustration-photo-card:nth-child(3) {
          top: 25%;
          left: 58%;
          transform: translate(-50%, -50%) rotate(-6deg);
        }

        .illustration-photo-card:nth-child(4) {
          top: 50%;
          left: 80%;
          transform: translate(-50%, -50%) rotate(8deg);
        }

        .illustration-photo-card:hover {
          z-index: 10 !important;
          transform: translate(-50%, -50%) rotate(0deg) scale(1.1);
        }

        /* Experience entry responsive */
        .experience-entry {
          flex-direction: row;
        }

        /* ─── Tablet (810-1199px) ─── */
        @media (min-width: 810px) and (max-width: 1199.98px) {
          .about-us-page {
            width: 810px;
          }
          .about-us-padding {
            padding: 160px 32px 144px 32px;
          }
          .about-us-main {
            gap: 24px;
          }
          .illustration-section {
            padding: 240px 40px;
          }
          .illustration-inner {
            height: 500px;
          }
          .illustration-photo-card:nth-child(1) {
            top: 70%;
            left: 35%;
          }
          .illustration-photo-card:nth-child(2) {
            top: 35%;
            left: 16%;
          }
          .illustration-photo-card:nth-child(3) {
            top: 18%;
            left: 58%;
          }
        }

        /* ─── Mobile (<810px) ─── */
        @media (max-width: 809.98px) {
          .about-us-page {
            width: 390px;
          }
          .about-us-padding {
            padding: 144px 24px 144px 24px;
          }
          .about-us-main {
            gap: 24px;
          }

          .about-user-layout {
            flex-direction: column;
          }

          .about-user-pic {
            max-width: 100%;
            aspect-ratio: 0.645833;
            max-height: 480px;
          }

          .skills-grid {
            grid-template-columns: repeat(1, minmax(50px, 1fr));
          }

          .tools-grid {
            grid-template-columns: repeat(2, minmax(50px, 1fr));
          }

          .experience-entry {
            flex-direction: column;
            gap: 12px;
          }

          .experience-entry > p:first-child {
            width: 100% !important;
            max-width: 100% !important;
          }

          .illustration-section {
            padding: 144px 0;
          }

          .illustration-inner {
            height: auto;
            display: flex;
            flex-direction: column;
            gap: 16px;
            position: relative;
          }

          .illustration-photo-card {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            transform: none !important;
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 0.795122;
          }

          .illustration-photo-card:nth-child(1) {
            transform: rotate(1deg) !important;
            order: 0;
          }
          .illustration-photo-card:nth-child(2) {
            transform: none !important;
            order: 4;
          }
          .illustration-photo-card:nth-child(3) {
            transform: rotate(4deg) !important;
            order: 2;
          }
          .illustration-photo-card:nth-child(4) {
            transform: none !important;
            order: 6;
          }

          .illustration-photo-card:hover {
            z-index: 10 !important;
            transform: rotate(0deg) scale(1.1) !important;
          }

          .illustration-section figure,
          .illustration-section > div > figure {
            display: none;
          }
        }
      `}</style>

      <div className="about-us-page">
        <div className="about-us-padding">
          <main className="about-us-main">
            <HeaderSection />
            <AboutUserSection />
            <ExperiencesSection />
            <ProcessSection />
            <SkillsSection />
            <ToolStackSection />
            <IllustrationSection />
          </main>
        </div>
      </div>
    </>
  )
}
