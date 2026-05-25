"use client"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import HighlightText from "@/components/highlight-text"
import FlowingBorder from "@/components/flowing-border"
import { useCursorGlow } from "@/lib/use-cursor-glow"
import OtherProjects from "@/components/other-projects"
import Divider from "@/components/divider"
import { colors, fonts, text, syntax, styles } from "@/lib/design-tokens"

const SHAPES_ICON_URL = "/img/shapes-icon.png"

const labelStyle: React.CSSProperties = {
  margin: 0,
  width: "25%",
  minWidth: 90,
}

const bodyStyle: React.CSSProperties = {
  margin: 0,
  width: "100%",
}

const codeBlockShell: React.CSSProperties = {
  margin: "12px 0",
  borderRadius: 12,
  border: `1px solid ${colors.dark[50]}`,
  overflow: "hidden",
}

const codeBlockHeader: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 16px",
  borderBottom: `1px solid ${colors.dark[600]}`,
  background: colors.dark[500],
}

const codeBlockPre: React.CSSProperties = {
  margin: 0,
  padding: 16,
  fontSize: 13,
  lineHeight: "1.7",
  color: colors.neutral[400],
  fontFamily: fonts.display,
  overflowX: "auto",
}

type ApngTab = {
  key: string
  icon: (isActive: boolean) => React.ReactNode
  label: string
  paragraphs: ReactNode[]
}

const APNG_TABS: ApngTab[] = [
  {
    key: "compat",
    icon: (isActive) => (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity={isActive ? 0.5 : 0.25} d="M8.16663 2.58334H19.8336C21.6284 2.58352 23.0836 4.03853 23.0836 5.83334V22.1664C23.0836 23.9612 21.6284 25.4162 19.8336 25.4164H8.16663C6.3717 25.4164 4.91663 23.9613 4.91663 22.1664V5.83334C4.91663 4.03842 6.3717 2.58334 8.16663 2.58334ZM11.3746 21.3333C10.7535 21.3335 10.2496 21.8371 10.2496 22.4583C10.2496 23.0796 10.7535 23.5832 11.3746 23.5833H16.6246C17.246 23.5833 17.7496 23.0797 17.7496 22.4583C17.7496 21.837 17.246 21.3333 16.6246 21.3333H11.3746Z" fill={isActive ? "#FFFFFFBF" : "#B9B9B9"} stroke="url(#paint0_linear_compat)" stroke-width="0.5"/>
        <defs>
          <linearGradient id="paint0_linear_compat" x1="14" y1="2.33334" x2="14" y2="25.6667" gradientUnits="userSpaceOnUse">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    label: "兼容性广",
    paragraphs: [
      <>主流浏览器通杀：Chrome、Safari、Firefox 和 Edge 早已实现<HighlightText>原生支持</HighlightText>，无需任何 JavaScript 库或第三方插件即可播放。</>,
      <>移动端与小程序友好：在 iOS 和 Android 系统中，通过简单的第三方库或原生组件即可流畅调用。特别是在微信小程序等内存敏感的环境下，它比集成 Lottie 或 SVGA 引擎<HighlightText>更轻量，不会增加包体积负担</HighlightText>。</>,
      <>优雅降级：APNG 的第一帧是标准 PNG。在极少数不支持动效的环境下，它会显示为一张清晰的静态图，<HighlightText>保证了基础的用户体验</HighlightText>。</>,
    ],
  },
  {
    key: "color",
    icon: (isActive) => (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity={isActive ? 0.5 : 0.25} d="M14.0004 2.58334C20.1084 2.58351 25.0959 7.38036 25.4017 13.4124L25.4164 14.0003C25.3273 15.6269 24.7487 16.4961 23.9847 17.015C23.1948 17.5514 22.177 17.7377 21.1478 17.9222C20.5216 18.0345 19.8869 18.1475 19.3422 18.3509C18.7929 18.5561 18.3067 18.863 17.9984 19.3812C17.8733 19.5917 17.8236 19.8658 17.8011 20.1449C17.7783 20.4291 17.7818 20.7582 17.7845 21.097C17.7924 22.0595 17.7952 23.1319 17.3314 23.9701C16.8871 24.7727 15.9759 25.4163 14.0004 25.4164C7.69522 25.4164 2.58355 20.3054 2.58337 14.0003C2.58337 7.69508 7.69511 2.58334 14.0004 2.58334ZM8.16638 15.5003C7.06196 15.5005 6.16638 16.3959 6.16638 17.5003C6.16656 18.6046 7.06207 19.5002 8.16638 19.5003C9.27084 19.5003 10.1662 18.6048 10.1664 17.5003C10.1664 16.3958 9.27095 15.5003 8.16638 15.5003ZM8.16638 9.08334C7.06196 9.08352 6.16638 9.97888 6.16638 11.0833C6.16638 12.1878 7.06196 13.0832 8.16638 13.0833C9.27095 13.0833 10.1664 12.1879 10.1664 11.0833C10.1664 9.97877 9.27095 9.08334 8.16638 9.08334ZM20.4164 9.08334C19.312 9.08352 18.4164 9.97888 18.4164 11.0833C18.4164 12.1878 19.312 13.0832 20.4164 13.0833C21.521 13.0833 22.4164 12.1879 22.4164 11.0833C22.4164 9.97877 21.521 9.08334 20.4164 9.08334ZM14.0004 5.58334C12.8958 5.58334 12.0004 6.47877 12.0004 7.58334C12.0004 8.68791 12.8958 9.58334 14.0004 9.58334C15.1048 9.58317 16.0004 8.6878 16.0004 7.58334C16.0004 6.47888 15.1048 5.58352 14.0004 5.58334Z" fill={isActive ? "#FFFFFFBF" : "#B9B9B9"} stroke="url(#paint0_linear_color)" stroke-width="0.5"/>
        <defs>
          <linearGradient id="paint0_linear_color" x1="14" y1="2.33334" x2="14" y2="25.6667" gradientUnits="userSpaceOnUse">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    label: "颜色还原好",
    paragraphs: [
      <>与 GIF 的 256 色索引调色板不同，APNG 支持完整的<HighlightText>24 位真彩色（1677 万色）和 8 位 Alpha 透明通道</HighlightText>，能够精准还原设计师在 AE 中制作的复杂渐变、光效叠加和半透明过渡。</>,
      <>抽奖动画中频繁使用的金色光斑、粒子飘散、光晕扩散等效果，需要同时处理多层 Alpha 混合。APNG 的逐帧全色域+Alpha 能力确保<HighlightText>导出动画与 AE 预览完全一致，无色带、无锯齿</HighlightText>。</>,
      <>在深色背景（如本项目的 rgb(31,33,38)）上播放时，APNG 的 Alpha 透明可与底层 UI 自然融合，<HighlightText>避免 GIF 那种边缘毛刺和白边问题</HighlightText>。</>,
    ],
  },
  {
    key: "size",
    icon: (isActive) => (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity={isActive ? 0.5 : 0.25} d="M7 3.75H21C22.7949 3.75 24.25 5.20507 24.25 7V21C24.25 22.7949 22.7949 24.25 21 24.25H7C5.20507 24.25 3.75 22.7949 3.75 21V7C3.75 5.20507 5.20507 3.75 7 3.75ZM13.252 14.748C12.6987 14.1948 11.8013 14.1948 11.248 14.748L8.41699 17.5791V15.75C8.41699 14.9676 7.7824 14.333 7 14.333C6.2176 14.333 5.58301 14.9676 5.58301 15.75V19.833C5.58301 21.2597 6.74026 22.417 8.16699 22.417H12.25C13.0324 22.417 13.667 21.7824 13.667 21C13.667 20.2176 13.0324 19.583 12.25 19.583H10.4199L13.252 16.752C13.8052 16.1987 13.8052 15.3013 13.252 14.748ZM15.75 5.58301C14.9676 5.58301 14.333 6.2176 14.333 7C14.333 7.7824 14.9676 8.41699 15.75 8.41699H17.5801L14.748 11.248C14.1948 11.8013 14.1948 12.6987 14.748 13.252C15.3013 13.8052 16.1987 13.8052 16.752 13.252L19.583 10.4199V12.25C19.583 13.0324 20.2176 13.667 21 13.667C21.7824 13.667 22.417 13.0324 22.417 12.25V8.16699C22.417 6.74026 21.2597 5.58301 19.833 5.58301H15.75Z" fill={isActive ? "#FFFFFFBF" : "#B9B9B9"} stroke="url(#paint0_linear_size)" stroke-width="0.5"/>
        <defs>
          <linearGradient id="paint0_linear_size" x1="14" y1="3.5" x2="14" y2="24.5" gradientUnits="userSpaceOnUse">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    label: "大小可控",
    paragraphs: [
      <>APNG 本质上是多帧 PNG 序列，每一帧都可使用 PNG 的无损压缩（DEFLATE），在保证像素级还原的前提下，文件体积通常比<HighlightText>同等质量的 GIF 小 30%-60%</HighlightText>。</>,
      <>通过<HighlightText>「关键帧 + 帧率 + 分辨率」三维调控</HighlightText>，可以精确控制最终文件大小：减少非关键帧的色彩复杂度、降低播放帧率（如 15fps→10fps）、或裁切边缘透明像素，都能显著压缩体积。</>,
      <>在本项目中，单个抽奖动画的 APNG 序列帧控制在<HighlightText>200-400KB 区间，加载耗时 {"<"} 1 秒</HighlightText>（4G 网络），在质量与性能间取得了最佳平衡。</>,
    ],
  },
]

function ApngTabButton({
  tab,
  isActive,
  onClick,
}: {
  tab: ApngTab
  isActive: boolean
  onClick: () => void
}) {
  const { ref, glowVisible } = useCursorGlow({ enabled: !isActive })

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="apng-tab-btn"
      {...(isActive ? { 'data-no-glow': '' } : {})}
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: 12,
        position: "relative",
        flex: 1,
        minWidth: 120,
        borderRadius: 12,
        cursor: "pointer",
        border: "none",
        borderTop: isActive ? "none" : `1px solid ${colors.dark[50]}`,
        borderLeft: isActive ? "none" : `1px solid ${colors.dark[50]}`,
        backgroundColor: isActive ? colors.dark[800] : colors.dark[500],
      }}
    >
      {!isActive && <FlowingBorder visible={glowVisible} backgroundColor={colors.dark[500]} radius={200} />}
      <span style={{ position: "relative", zIndex: 1, display: "flex" }}>{tab.icon(isActive)}</span>
      <p
        className="text-body-medium"
        style={{
          margin: 0,
          fontSize: 14,
          position: "relative",
          zIndex: 1,
          color: isActive ? colors.neutral[50] : colors.neutral[400],
          transition: "color 0.2s ease",
        }}
      >
        {tab.label}
      </p>
    </button>
  )
}

export default function WorkLotteryPage() {
  const [activeApngTab, setActiveApngTab] = useState("compat")
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "clip",
      }}
    >
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
              {"米哈游抽奖系统"}
            </h1>
            <Divider />
            <p className="text-body" style={{ margin: 0 }}>
              {"米哈游内部专用的年会及内推活动抽奖系统。通过标准化 UI 组件与 AE 动画模板的「换肤」机制，将抽奖动画的制作周期从 2-3 周缩短至 1 周。"}
            </p>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"关键词"}</p>
                <p className="text-body" style={bodyStyle}>{"企业内部活动 / 动画设计 / 换肤机制"}</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"工作内容"}</p>
                <p className="text-body" style={bodyStyle}>
                  {"UI/UX 设计师 | 设计抽奖动画的换肤框架，制定 UI 组件规范与 AE 模板交付流程"}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"项目年份"}</p>
                <p className="text-body" style={bodyStyle}>{"2026"}</p>
              </div>
            </div>
          </article>

          {/* ═══ Card 2: Main Showcase ═══ */}
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
            {/* (A) Video Demo Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 12,
              }}
            >
              {[
                "/img/抽奖/抽奖动画.mp4",
                "/img/抽奖/抽奖动画1.mp4",
                "/img/抽奖/抽奖动画2.mp4",
                "/img/抽奖/抽奖动画4.mp4",
              ].map((src) => (
                <video
                  key={src}
                  src={src}
                  controls
                  loop
                  muted
                  playsInline
                  onClick={() => setActiveVideo(src)}
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    borderRadius: 12,
                    border: "1px solid " + colors.dark[400],
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <Divider />

            {/* (C) Challenge */}
            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"🤔 我的思考"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"每次年会、内推等活动的抽奖动画都需从零开始——从 UI 到动画再到研发联调，"}
                <HighlightText>整个流程至少需要 2-3 周</HighlightText>
                {"。不同活动的交互逻辑高度相似，差异仅在视觉主题，存在巨大的提效空间。"}
              </p>
            </div>

            <Divider />

            {/* (E) Solution: Skinning */}
            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"💡 换肤思路"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"既然不同活动的抽奖动画"}
                <HighlightText>骨架结构一致，差异仅在「皮肤」</HighlightText>
                {"，我借鉴游戏角色换装思路，将系统拆解为两层："}
                <HighlightText>固定的「骨架」层（组件 + 交互动画）</HighlightText>
                {" 和 "}
                <HighlightText>可替换的「皮肤」层（视觉主题）</HighlightText>
                {"。新活动只需更换皮肤，无需重建骨架。"}
              </p>
            </div>

            {/* (F) SVG Chevron */}
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
                <path d="M 32.842 36.508 C 29.45 41.035 22.526 41.035 19.134 36.508 L 1.651 13.174 C -2.449 7.701 1.557 0 8.506 0 L 43.471 0 C 50.42 0 54.425 7.701 50.325 13.174 L 32.842 36.508 Z" fill="rgb(39, 42, 49)" stroke="rgb(58, 61, 67)" strokeWidth="2" strokeMiterlimit="10" />
              </svg>
            </div>

            {/* (G) Implementation Steps */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p className="text-body-medium" style={{ margin: 0 }}>
                  {"Step 1 ：标准化 UI 组件"}
                </p>
                <p className="text-body" style={bodyStyle}>
                  {"将 Button、Dropdown 等 UI 元素设计为标准化组件，预留可替换的背景图层。"}
                  <HighlightText>设计师只需在 Figma 中复制母组件并替换背景即可</HighlightText>
                  {"。"}
                </p>
              </div>

              <div style={{ overflow: "auto" }}>
                <img
                  src="/img/抽奖/组件.png"
                  alt="标准化 UI 组件设计稿"
                  style={{
                    width: "100%",
                    height: "auto",
                    minWidth: 600,
                    display: "block",
                  }}
                />
              </div>

              <div
                style={{
                  width: "100%",
                  height: 56,
                  aspectRatio: "17 / 1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="52" height="40" viewBox="0 0 52 40" fill="none" overflow="visible">
                  <path d="M 32.842 36.508 C 29.45 41.035 22.526 41.035 19.134 36.508 L 1.651 13.174 C -2.449 7.701 1.557 0 8.506 0 L 43.471 0 C 50.42 0 54.425 7.701 50.325 13.174 L 32.842 36.508 Z" fill="rgb(39, 42, 49)" stroke="rgb(58, 61, 67)" strokeWidth="2" strokeMiterlimit="10" />
                </svg>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p className="text-body-medium" style={{ margin: 0 }}>
                  {"Step 2 ：AE 动画模板化"}
                </p>
                <p className="text-body" style={bodyStyle}>
                  {"将 AE 工程封装为"}
                  <HighlightText>2 套标准动画模板</HighlightText>
                  {"，设计师只需"}
                  <HighlightText>替换相同尺寸的视觉素材</HighlightText>
                  {"即直接导出新的抽奖动画，无需从零开始制作 AE 动画。"}
                </p>
              </div>

              <div
                style={{
                  width: "100%",
                  height: 56,
                  aspectRatio: "17 / 1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="52" height="40" viewBox="0 0 52 40" fill="none" overflow="visible">
                  <path d="M 32.842 36.508 C 29.45 41.035 22.526 41.035 19.134 36.508 L 1.651 13.174 C -2.449 7.701 1.557 0 8.506 0 L 43.471 0 C 50.42 0 54.425 7.701 50.325 13.174 L 32.842 36.508 Z" fill="rgb(39, 42, 49)" stroke="rgb(58, 61, 67)" strokeWidth="2" strokeMiterlimit="10" />
                </svg>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p className="text-body-medium" style={{ margin: 0 }}>
                  {"Step 3 ：标准化交付流程"}
                </p>
                <p className="text-body" style={bodyStyle}>
                  {"打包交付"}
                  <HighlightText>2 套 AE 动画模板 + 1 套 UI 组件模板</HighlightText>
                  {"，研发流程精简为两步："}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 16 }}>
                  <p className="text-body" style={{ margin: 0 }}>
                    {"· UI 层：Figma 复制母组件 → 替换背景 → 导出"}
                  </p>
                  <p className="text-body" style={{ margin: 0 }}>
                    {"· 动画层：AE 模板渲染导出 "}
                    <HighlightText>2 段 APNG 序列帧 + 1 张 PNG 静态图 + 时间配置</HighlightText>
                  </p>
                </div>

                {/* 系统结构图 */}
                <div style={{ overflow: "auto" }}>
                  <img
                    src="/img/抽奖/结构.png"
                    alt="抽奖系统结构图"
                    style={{
                      width: "100%",
                      height: "auto",
                      minWidth: 600,
                      display: "block",
                    }}
                  />
                </div>

                {/* 素材切换时间配置代码块 */}
                <div style={codeBlockShell}>
                  <div style={codeBlockHeader}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors.neutral[400] }} />
                    <span style={{ fontSize: text.body.fontSize, color: colors.neutral[400], fontWeight: 500, letterSpacing: 0.5 }}>素材切换时间配置</span>
                  </div>
                  <pre style={codeBlockPre}><code>
<span style={{ color: syntax.comment }}>{"/** PC端动画时间配置 */\n"}</span>
<span style={{ color: syntax.comment }}>{"// 第一张动效循环时间，一共113帧\n"}</span>
<span style={{ color: syntax.keyword }}>{"const"}</span>{" "}<span style={{ color: syntax.variable }}>{"startTimes"}</span>{" = "}<span style={{ color: syntax.number }}>{"3766"}</span>{";\n\n"}
<span style={{ color: syntax.comment }}>{"// 第一张动效开始移动的时间点 第90帧移动\n"}</span>
<span style={{ color: syntax.keyword }}>{"const"}</span>{" "}<span style={{ color: syntax.variable }}>{"startMoveTime"}</span>{" = "}<span style={{ color: syntax.number }}>{"3000"}</span>{";\n\n"}
<span style={{ color: syntax.comment }}>{"// 第二张动效时间，一共101帧\n"}</span>
<span style={{ color: syntax.keyword }}>{"const"}</span>{" "}<span style={{ color: syntax.variable }}>{"ingTimes"}</span>{" = "}<span style={{ color: syntax.number }}>{"3366"}</span>{";\n\n"}
<span style={{ color: syntax.comment }}>{"// 第二张动效奖品展示时间点 第25帧率\n"}</span>
<span style={{ color: syntax.keyword }}>{"const"}</span>{" "}<span style={{ color: syntax.variable }}>{"showRewardTime"}</span>{" = "}<span style={{ color: syntax.number }}>{"833"}</span>{";\n\n"}
<span style={{ color: syntax.comment }}>{"/** Mob端特定配置 */\n\n"}</span>
<span style={{ color: syntax.comment }}>{"// 第一张动效循环时间，一共112帧\n"}</span>
<span style={{ color: syntax.keyword }}>{"const"}</span>{" "}<span style={{ color: syntax.variable }}>{"mobileStartTimes"}</span>{" = "}<span style={{ color: syntax.number }}>{"3733"}</span>{";\n\n"}
<span style={{ color: syntax.comment }}>{"// 第一张动效开始移动的时间点 第90帧移动\n"}</span>
<span style={{ color: syntax.keyword }}>{"const"}</span>{" "}<span style={{ color: syntax.variable }}>{"mobileStartMoveTime"}</span>{" = "}<span style={{ color: syntax.number }}>{"3000"}</span>{";\n\n"}
<span style={{ color: syntax.comment }}>{"// 第二张动效时间，一共91帧\n"}</span>
<span style={{ color: syntax.keyword }}>{"const"}</span>{" "}<span style={{ color: syntax.variable }}>{"mobileIngTimes"}</span>{" = "}<span style={{ color: syntax.number }}>{"3033"}</span>{";\n\n"}
<span style={{ color: syntax.comment }}>{"// 第二张动效奖品展示时间点 第28帧率\n"}</span>
<span style={{ color: syntax.keyword }}>{"const"}</span>{" "}<span style={{ color: syntax.variable }}>{"mobileShowRewardTime"}</span>{" = "}<span style={{ color: syntax.number }}>{"933"}</span>{";"}
</code></pre>
                </div>

                <p className="text-body" style={bodyStyle}>
                  <HighlightText>对接过程从多轮沟通简化为一次交付</HighlightText>
                  {"。"}
                </p>
              </div>
            </div>

            <Divider />

            {/* (I) Why APNG - Tabbed Interface */}
            <div style={{ ...styles.featureRow, justifyContent: "center" }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content" }}>{"🎞️ 为什么选择 APNG"}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {APNG_TABS.map((tab) => {
                  const isActive = activeApngTab === tab.key
                  return <ApngTabButton key={tab.key} tab={tab} isActive={isActive} onClick={() => setActiveApngTab(tab.key)} />
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeApngTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {APNG_TABS.find((t) => t.key === activeApngTab)?.paragraphs.map(
                    (para, i) => (
                      <p key={i} className="text-body" style={bodyStyle}>
                        {para}
                      </p>
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <Divider />

            {/* (K) Impact */}
            <div style={{ ...styles.featureRow, justifyContent: "center" }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content" }}>
                {"🏁 最终成果 🏁"}
              </p>
            </div>

            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"🧑‍🎨 设计提效"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"通过「换肤」机制，设计周期"}
                <HighlightText>从 2-3 周缩短至 1 周</HighlightText>
                {"，效率提升超 60%"}
              </p>
            </div>

            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"🚀 开发提效"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"规范交付标准，减少开发沟通成本 & 走查成本，开发工时"}
                <HighlightText>从 1 周缩短至 2 天</HighlightText>
              </p>
            </div>
          </article>

          {/* ═══ Card 3: Other Projects ═══ */}
          <OtherProjects currentSlug="/work/lottery" />
        </section>
      </div>

      {/* Video Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            key="video-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <motion.video
              key={activeVideo}
              src={activeVideo}
              controls
              autoPlay
              muted
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: 12,
                outline: "none",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
