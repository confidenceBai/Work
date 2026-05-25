"use client"

import HighlightText from "@/components/highlight-text"
import CitationBar from "@/components/citation-bar"
import WhatStepSection, { type WhatStep } from "@/components/what-step-section"
import OtherProjects from "@/components/other-projects"
import Divider from "@/components/divider"
import { colors, styles } from "@/lib/design-tokens"

const SHAPES_ICON_URL = "/img/shapes-icon.png"

const COVER_IMAGE = "/img/CC/封面.png"

const labelStyle: React.CSSProperties = {
  margin: 0,
  width: "25%",
  minWidth: 90,
}

const bodyStyle: React.CSSProperties = {
  margin: 0,
  width: "100%",
}

const placeholderBox: React.CSSProperties = {
  width: "100%",
  aspectRatio: "16 / 9",
  borderRadius: 12,
  border: `1px dashed ${colors.dark[50]}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: 8,
  backgroundColor: colors.dark[900],
}

const chevronDivider = (
  <div
    style={{
      width: "100%",
      height: 56,
      aspectRatio: "17",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
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
)

const WHAT_STEPS: WhatStep[] = [
  {
    title: "Step 1：导入知识库",
    body: (
      <>
        {"将设计系统文档、组件使用规范、业务逻辑等导入插件，"}
        <HighlightText>AI 有了上下文</HighlightText>
        {"。"}
      </>
    ),
  },
  {
    title: "Step 2：选中组件，一键生成",
    body: (
      <>
        {"插件自动提取组件结构（props、变体、图层），结合知识库上下文，"}
        <HighlightText>AI 生成标准设计规范</HighlightText>
        {"。"}
      </>
    ),
  },
  {
    title: "Step 3：人工完善 + 写入 Figma",
    body: (
      <>
        {"生成初稿后人工补充细节，一键写入 Figma 画布生成"}
        <HighlightText>1440px 标准规范帧</HighlightText>
        {"，包含概述、变体、交互说明、显示规则等分区。"}
      </>
    ),
  },
]

export default function WorkComponentCheckerPage() {
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
        style={{
          position: "absolute",
          width: 484,
          height: 491,
          top: -137,
          right: -137,
          overflow: "clip",
          zIndex: 4,
          pointerEvents: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SHAPES_ICON_URL}
          alt=""
          style={{
            position: "absolute",
            height: 533,
            aspectRatio: "1",
            right: -29,
            bottom: -28,
            left: -20,
            transform: "rotate(20deg)",
            objectFit: "contain",
          }}
        />
      </div>

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
            padding: "176px 40px",
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
              {"Component Checker"}
            </h1>
            <Divider />
            <p className="text-body" style={{ margin: 0 }}>
              {"一款 Figma 插件，用于图标规范检查与设计文档生成。从手动校验 300 个 icon 的痛苦中，生长出一个自动化工具，再从检查工具进化为设计规范平台。"}
            </p>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"关键词"}</p>
                <p className="text-body" style={bodyStyle}>{"设计规范 / Figma 插件 / AI / 提效工具"}</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"工作内容"}</p>
                <p className="text-body" style={bodyStyle}>
                  {"UI/UX 设计师 | 制定 Icon 组件规范，开发 Figma 校验插件，撰写 30+ 组件开发规范"}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"项目年份"}</p>
                <p className="text-body" style={bodyStyle}>{"2024 – 2025"}</p>
              </div>
            </div>
          </article>

          {/* ═══ Card 2: Showcase ═══ */}
          <article
            className="case-study-card"
            style={{
              ...styles.card,
              maxWidth: 1000,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Cover image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={COVER_IMAGE}
              alt="Component Checker 封面"
              style={{ width: "100%", height: "auto", borderRadius: 12 }}
            />

            <Divider />

            {/* Block A — 挑战：两个痛点 */}
            <div style={{ ...styles.featureRow, justifyContent: "center" }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content" }}>{"挑战"}</p>
            </div>

            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"质量守门"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"每新增一个 icon，都要逐一校验命名、图层数量、约束设置、填充规则等 6 项细节。"}
                <HighlightText>任何一个参数没设对，后续调用就会出问题</HighlightText>
                {"；上传到 iconfont 时甚至会直接报错。"}
              </p>
            </div>

            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"检索效率"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"300+ icon 存在组件库中，设计师调用时要在茫茫 icon 海里逐个翻找。没有语义描述，"}
                <HighlightText>只能靠名字猜，效率十分低下</HighlightText>
                {"。"}
              </p>
            </div>

            <Divider />

            {/* Block B — 规范检查 + AI 描述 */}
            <div style={{ ...styles.featureRow, justifyContent: "center" }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content" }}>{"规范检查 + AI 描述"}</p>
            </div>

            <CitationBar>
              <p className="text-body" style={{ ...bodyStyle, margin: 0 }}>
                {"校验保证质量，语义描述解决检索 — 两个痛点，一个插件搞定。"}
              </p>
            </CitationBar>

            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"规范检查"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"针对质量守门压力，插件内置 6 项校验规则：命名重复、Vector 图层数量、命名规范、Constraints、Fill Rule、重复路径。支持"}
                <HighlightText>一键批量修复</HighlightText>
                {"，fixAll 处理所有常见问题。"}
              </p>
            </div>

            {/* 规范检查截图占位 */}
            <div role="img" aria-label="规范检查界面截图" style={placeholderBox}>
              <p style={{ margin: 0, fontSize: 14, color: colors.neutral[500], fontWeight: 500 }}>
                {"规范检查界面截图（待补充）"}
              </p>
            </div>

            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"AI 描述"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"针对检索效率问题，调用 Google Gemini API 为每个 icon 自动生成 4 个中文 + 4 个英文语义关键词，写回 Figma 组件的 description 属性。"}
                <HighlightText>设计师通过模糊检索即可快速定位</HighlightText>
                {"，不用再逐个翻找。红色图标自动前缀「特殊图标禁止使用」，防止误用。"}
              </p>
            </div>

            {/* AI 描述截图占位 */}
            <div role="img" aria-label="AI 描述结果截图" style={placeholderBox}>
              <p style={{ margin: 0, fontSize: 14, color: colors.neutral[500], fontWeight: 500 }}>
                {"AI 描述结果截图（待补充）"}
              </p>
            </div>

            {chevronDivider}

            {/* Block C — 设计规范生成 */}
            <div style={{ ...styles.featureRow, justifyContent: "center" }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content" }}>{"设计规范生成"}</p>
            </div>

            <CitationBar>
              <p className="text-body" style={{ ...bodyStyle, margin: 0 }}>
                {"以前写一份组件规范，需要参考 Ant Design、Semi Design 等各大组件库，逐一对比属性、交互状态、显示规则。"}
                <HighlightText>一份规范往往需要 2-3 天的设计工时</HighlightText>
                {"。"}
              </p>
            </CitationBar>

            <p className="text-body" style={bodyStyle}>
              {"我尝试让 AI 来做这件事 — 但前提是它需要「懂」我们的设计系统。"}
            </p>

            <WhatStepSection steps={WHAT_STEPS} />

            {/* 规范帧截图占位 */}
            <div role="img" aria-label="生成的规范帧截图" style={placeholderBox}>
              <p style={{ margin: 0, fontSize: 14, color: colors.neutral[500], fontWeight: 500 }}>
                {"规范帧截图（待补充）"}
              </p>
            </div>

            <Divider />

            {/* Block D — 最终成果 */}
            <div style={{ ...styles.featureRow, justifyContent: "center" }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content" }}>{"最终成果"}</p>
            </div>

            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"批量校验"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"每新增一个 icon 都要逐一校验 6 项规则，"}
                <HighlightText>现在一键批量校验</HighlightText>
                {"。"}
              </p>
            </div>

            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"语义检索"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"300+ icon 从靠名字猜，"}
                <HighlightText>变成通过语义关键词模糊检索</HighlightText>
                {"。"}
              </p>
            </div>

            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"规范提效"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"一份组件规范从参考各大组件库写 2-3 天，"}
                <HighlightText>变成 AI 生成半天搞定</HighlightText>
                {"。"}
              </p>
            </div>

            {/* 量化指标卡片 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              <div style={{ ...styles.subCard, padding: 16, textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 36, fontWeight: 600, color: colors.neutral[50], lineHeight: 1.2 }}>
                  {"300+"}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 14, color: colors.neutral[400] }}>
                  {"icon 校验"}
                </p>
              </div>
              <div style={{ ...styles.subCard, padding: 16, textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 36, fontWeight: 600, color: colors.neutral[50], lineHeight: 1.2 }}>
                  {"30+"}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 14, color: colors.neutral[400] }}>
                  {"组件规范"}
                </p>
              </div>
              <div style={{ ...styles.subCard, padding: 16, textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 36, fontWeight: 600, color: colors.neutral[50], lineHeight: 1.2 }}>
                  {"半天"}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 14, color: colors.neutral[400] }}>
                  {"规范生成（原 2-3 天）"}
                </p>
              </div>
            </div>
          </article>

          {/* ═══ Other Projects ═══ */}
          <OtherProjects currentSlug="/work/component-checker" />
        </section>
      </div>
    </main>
  )
}
