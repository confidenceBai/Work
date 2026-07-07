"use client"

import { useRef, useState } from "react"
import ThreeWPanel, { type ThreeWTab } from "@/components/three-w-panel"
import CitationBar from "@/components/citation-bar"
import HighlightText from "@/components/highlight-text"
import OtherProjects from "@/components/other-projects"
import Divider from "@/components/divider"
import { colors, styles, fonts } from "@/lib/design-tokens"

const labelStyle: React.CSSProperties = {
  margin: 0,
  width: "25%",
  minWidth: 90,
}

const bodyStyle: React.CSSProperties = {
  margin: 0,
  width: "100%",
}

/* ─── 卡片组合预览 ─── */

/* ─── Tab 配置 ─── */

const HOYOWAVE_TABS: ThreeWTab[] = [
  { key: "im", label: "IM", subtitle: "即时通讯·视觉升级" },
  { key: "platform", label: "Open Platform", subtitle: "模块化消息卡片" },
]

const HOYOWAVE_SECTIONS = {
  im: [
    {
      title: "",
      gap: 24,
      body: (
        <>
          <CitationBar>
            <p className="text-body" style={{ ...bodyStyle, margin: 0 }}>
              {"在 miHoYo 任职的前两年与其他三位设计师一起负责 HoYoWave 的视觉设计工作，"}
              <HighlightText>{"支持了大量的版本需求"}</HighlightText>
              {"。下面将介绍其中一个视觉升级需求："}
              <br />
              {"背景是 HoYoWave 即将全公司全量上线，但原版视觉风格老旧，不符合米哈游的「技术宅」调性。要求"}
              <HighlightText>{"一周时间，完成产品品质提升"}</HighlightText>
              {"。"}

            </p>
          </CitationBar>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/HoYoWave/IM/IM 封面.png"
            alt="HoYoWave 产品全貌"
            style={{ width: "100%", height: "auto", borderRadius: 12, border: `1px solid ${colors.dark[50]}` }}
          />
        </>
      ),
    },
    {
      title: "品牌色植入",
      layout: "row" as const,
      body: (
        <div className="text-body">
          {"顶部从深蓝紫渐变改为米哈游 Logo 色系的青蓝色 — 米哈游员工打开产品的第一眼，"}
          <HighlightText>{"就能明白产品用色的含义。"}</HighlightText>
        </div>
      ),
    },
  ],
  platform: [
    {
      title: "",
      body: (
        <CitationBar>
          <p className="text-body" style={{ ...bodyStyle, margin: 0 }}>
            {"独立负责开放平台消息卡片设计工作，原本消息卡片为公司开发者推送自动化消息的载体。"}
            <br />
            {"随着 AI 时代的到来，消息卡片渐渐成为了 Wave 中 "}
            <HighlightText>{"Bot 最合适的信息载体"}</HighlightText>
            {"（也可以说是 Bot 的 UI） — "}
            <HighlightText>{"此前的消息卡片的样式、布局定义无心插柳的为后续 Bot 的基建打下了基础。"}</HighlightText>
          </p>
        </CitationBar>
      ),
    },
    {
      title: "Markdown 定义",
      layout: "row" as const,
      body: (
        <div className="text-body">
          {"从标题、列表到代码块 — "}
          <HighlightText>{"不是照搬 Markdown 语法，而是为每种原语定义独立的排版规则，如："}</HighlightText>
          {"h1–h4 各自的字号与行高、有序列表的 Inter 数字混排、嵌套缩进的边距碰撞规则。"}
        </div>
      ),
      imageSrc: "/img/HoYoWave/OP/markdown.png",
      imageAfterBody: true,
    },
    {
      title: "交互控件",
      layout: "row" as const,
      body: (
        <div className="text-body">
          {"定义了各类控件，如：按钮、选择器、日期选择、输入框等操作组件 —"}
          <HighlightText>{"帮助 AI 获取或引导用户决策或。"}</HighlightText>
        </div>
      ),
      imageSrc: "/img/HoYoWave/OP/交互组件.png",
      imageAfterBody: true,
    },
    {
      title: "模块化布局",
      layout: "row" as const,
      body: (
        <div className="text-body">
          {"基于栅格的列/行/跨列组合规则，让卡片在不同内容量下自适应 —"}
          <HighlightText>{" AI 生成的内容长度不可控，布局必须兜底。"}</HighlightText>
        </div>
      ),
      imageSrc: "/img/HoYoWave/OP/容器布局.png",
      imageAfterBody: true,
      noMaxHeight: true,
    },
    {
      title: "",
      body: (
        <div style={{ width: "100%", height: 56, aspectRatio: "17 / 1", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="52" height="40" viewBox="0 0 52 40" fill="none" overflow="visible">
            <path
              d="M 32.842 36.508 C 29.45 41.035 22.526 41.035 19.134 36.508 L 1.651 13.174 C -2.449 7.701 1.557 0 8.506 0 L 43.471 0 C 50.42 0 54.425 7.701 50.325 13.174 L 32.842 36.508 Z"
              fill="rgb(39, 42, 49)"
              stroke="rgb(58, 61, 67)"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      ),
    },
    {
      title: "视觉一致性",
      layout: "row" as const,
      body: (
        <div className="text-body">
          {"无论卡片由哪些模块拼装，最终渲染结果必须在同一套视觉规则下 —"}
          <HighlightText>{" 这是设计系统的核心价值。"}</HighlightText>
          {"（图例为我为团队制作的“项目管理机器人”）"}
        </div>
      ),
      imageSrc: "/img/HoYoWave/OP/视觉一致性.png",
      imageAfterBody: true,
      noMaxHeight: true,
    },
  ],
}

/* ─── Page ─── */

export default function WorkHoYoWavePage() {
  const compareRef = useRef<HTMLDivElement>(null)
  const [splitPercent, setSplitPercent] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [activeTab, setActiveTab] = useState("im")

  const handleCompareMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = compareRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setSplitPercent(Math.max(0, Math.min(100, x)))
  }

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "clip",
      }}
    >
      {/* Decorative shapes icon */}
      <div
        className="case-study-wrapper"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 4,
          gap: 160,
        }}
      >
        <section
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 56,
            padding: "120px 40px",
          }}
        >
          {/* ═══ Card 1: Header ═══ */}
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
            <h1 className="text-h3" style={{ margin: 0 }}>
              {"HoYoWave"}
            </h1>
            <Divider />
            <p className="text-body" style={{ margin: 0 }}>
              {"HoYoWave 是米哈游自研的一站式协同办公平台，以即时通讯（IM）为核心，旨在整合即时通讯、内容创作、知识沉淀、日程管理、开放平台等协作功能。其中，主要负责即时通讯、开放平台部分的迭代需求，两年来共计处理大小需求 40+。"}
            </p>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"关键词"}</p>
                <p className="text-body" style={bodyStyle}>{"企业协作 / 即时通讯 / AI / 开放平台"}</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"工作内容"}</p>
                <p className="text-body" style={bodyStyle}>
                  {"UI/UX 设计师 | 负责 IM、开放平台两个模块的迭代设计，两年 40+ 需求"}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"项目年份"}</p>
                <p className="text-body" style={bodyStyle}>{"2023 – 2025"}</p>
              </div>
            </div>
          </article>

          {/* ═══ Card 2: Main Showcase ═══ */}
          <article
            className="case-study-card"
            style={{
              ...styles.card,
              maxWidth: 820,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Block A — Hero Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/HoYoWave/封面.png"
              alt="HoYoWave 产品主视觉截图"
              style={{ width: "100%", height: "auto", borderRadius: 12, border: `1px solid ${colors.dark[50]}` }}
            />

            {/* ═══ Three-Way Tab Panel ═══ */}
            <Divider />
            <ThreeWPanel
              tabs={HOYOWAVE_TABS}
              defaultTabKey="im"
              sectionsByTab={HOYOWAVE_SECTIONS}
              activeTabKey={activeTab}
              onTabChange={setActiveTab}
            >
              {/* ── IM Tab: Before/After + 空态 ── */}
              {activeTab === "im" && (
                <>
                  {/* Before / After 拉窗帘对比 */}
                  <div
                    ref={compareRef}
                    onMouseMove={handleCompareMove}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => { setHovering(false); setSplitPercent(0) }}
                    style={{
                      position: "relative",
                      width: "calc(100% - 24px)",
                      overflow: "hidden",
                      cursor: "col-resize",
                      margin: 12,
                    }}
                  >
                    {/* 底层：升级后 */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/img/HoYoWave/升级后.png"
                      alt="IM 视觉升级后"
                      data-no-lightbox
                      style={{ display: "block", width: "100%", height: "auto", objectFit: "contain" }}
                    />
                    {/* 顶层：升级前（带 clip-path 遮罩） */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/img/HoYoWave/升级前.png"
                      alt="IM 视觉升级前"
                      data-no-lightbox
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        clipPath: `inset(0 ${hovering ? 100 - splitPercent : 0}% 0 0)`,
                        transition: hovering ? "none" : "clip-path 0.3s ease",
                      }}
                    />
                    {/* 垂直分界线 — 发光 SVG */}
                    {hovering && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src="data:image/svg+xml,%3Csvg width='156' height='749' viewBox='0 0 156 749' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='mask0' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='1' y='0' width='155' height='749'%3E%3Crect x='1' width='155' height='749' fill='%23D9D9D9'/%3E%3C/mask%3E%3Cg mask='url(%23mask0)'%3E%3Cg filter='url(%23filter0)'%3E%3Cpath d='M1 0V749' stroke='url(%23paint0)' stroke-width='4'/%3E%3C/g%3E%3C/g%3E%3Cpath d='M1 0V749' stroke='url(%23paint1)' stroke-width='2'/%3E%3Cdefs%3E%3Cfilter id='filter0' x='-39.7' y='-38.7' width='81.4' height='826.4' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='19.35' result='effect1'/%3E%3C/filter%3E%3CradialGradient id='paint0' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(1.5 375) rotate(90) scale(374 9.05968)'%3E%3Cstop offset='0.918138' stop-color='%236277FF'/%3E%3Cstop offset='1' stop-color='%236277FF' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint1' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(1.5 375) rotate(90) scale(374 9.05968)'%3E%3Cstop offset='0.918138' stop-color='white'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E"
                        alt=""
                        style={{
                          position: "absolute",
                          top: 0,
                          left: `${splitPercent}%`,
                          height: "100%",
                          width: "auto",
                          pointerEvents: "none",
                          zIndex: 2,
                        }}
                      />
                    )}
                    {/* 提示标签 */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "4px 14px",
                        borderRadius: 32,
                        backgroundColor: colors.dark[700],
                        border: `1px solid ${colors.dark[50]}`,
                        color: colors.neutral[400],
                        fontFamily: fonts.display,
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                        pointerEvents: "none",
                        zIndex: 3,
                        opacity: hovering ? 0 : 1,
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      ↔ 悬停对比
                    </div>
                  </div>

                  <div style={styles.featureRow}>
                    <p className="text-body-medium" style={styles.featureTitle}>{"空态彩蛋"}</p>
                    <p className="text-body" style={styles.featureDesc}>
                      {"欢迎页从通用文件夹插画改为 Wave「W」视觉延展 + 技术宅猫元素 — 空状态不再是「无内容」，"}
                      <HighlightText>{"而是「有温度的品牌触点」。"}</HighlightText>
                    </p>
                  </div>

                  {/* 空态彩蛋 */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/img/HoYoWave/IM/空态.png"
                    alt="空态彩蛋 — W 视觉延展与猫元素"
                    style={{ width: "calc(100% - 24px)", height: "auto", borderRadius: 12, margin: 12 }}
                  />

                  <div style={styles.featureRow}>
                    <p className="text-body-medium" style={styles.featureTitle}>{"以小搏大"}</p>
                    <p className="text-body" style={styles.featureDesc}>
                      {"只改头部和空态两处，但整个产品的视觉气质从「工具」变「产品」—"}
                      <HighlightText>{"设计判断力比工作量更重要。"}</HighlightText>
                    </p>
                  </div>
                </>
              )}

              {/* ── 开放平台 Tab: 卡片预览 + 搭建器截图 ── */}
              {activeTab === "platform" && (
                <>
                </>
              )}
            </ThreeWPanel>

          </article>

          {/* ═══ Card 3: Other Projects ═══ */}
          <OtherProjects currentSlug="/work/hoyowave" />
        </section>
      </div>
    </main>
  )
}
