"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CitationBar from "@/components/citation-bar"
import HighlightText from "@/components/highlight-text"
import OtherProjects from "@/components/other-projects"
import Divider from "@/components/divider"
import { colors, text, styles } from "@/lib/design-tokens"
import { useCursorGlow } from "@/lib/use-cursor-glow"
import FlowingBorder from "@/components/flowing-border"

const SHAPES_ICON_URL = "/img/shapes-icon.png"

const SIGNAGE_BLUE = "#006EFA"
const SIGNAGE_RED = "#F73650"

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

type RoomTab = {
  key: string
  icon: (isActive: boolean) => React.ReactNode
  label: string
  title: string
  body: React.ReactNode
  placeholder: string
  imageSrc?: string
  images?: { src: string; alt: string; noBorderRadius?: boolean }[]
}

const ROOM_TABS: RoomTab[] = [
  {
    key: "routing",
    icon: (isActive) => (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity={isActive ? 0.5 : 0.25} d="M31.125 17.1252C32.2296 17.1252 33.125 18.0206 33.125 19.1252C33.1249 24.3718 28.8716 28.6252 23.625 28.6252H11.6172L11.9912 29.0422C12.6943 29.8273 12.6686 31.0347 11.9141 31.7892C11.133 32.5702 9.86696 32.5702 9.08594 31.7892L5.33594 28.0392C4.55492 27.2582 4.55498 25.9922 5.33594 25.2111L9.08594 21.4611C9.86699 20.6801 11.133 20.6801 11.9141 21.4611C12.6685 22.2157 12.6945 23.4231 11.9912 24.2082L11.6172 24.6252H23.625C26.6625 24.6252 29.1249 22.1627 29.125 19.1252C29.125 18.0206 30.0204 17.1252 31.125 17.1252ZM24.0859 4.21112C24.867 3.43007 26.133 3.43007 26.9141 4.21112L30.6641 7.96112C31.445 8.74217 31.4451 10.0082 30.6641 10.7892L26.9141 14.5392C26.133 15.3202 24.867 15.3202 24.0859 14.5392C23.3314 13.7847 23.3057 12.5773 24.0088 11.7922L24.3828 11.3752H13.875C10.1298 11.3752 7.07136 14.3161 6.88379 18.0148V18.0217L6.87207 18.4777C6.81854 19.5343 5.94499 20.3752 4.875 20.3752C3.77049 20.3752 2.87509 19.4797 2.875 18.3752C2.875 12.3001 7.79987 7.37518 13.875 7.37518H24.3828L24.0088 6.95819C23.3055 6.17314 23.3315 4.96569 24.0859 4.21112Z" fill={isActive ? "#FFFFFFBF" : "#B9B9B9"} stroke="url(#paint0_linear_routing)" stroke-width="0.5"/>
        <defs>
          <linearGradient id="paint0_linear_routing" x1="18" y1="3.37518" x2="18" y2="32.6248" gradientUnits="userSpaceOnUse">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity={isActive ? 0.5 : 0.25}/>
          </linearGradient>
        </defs>
      </svg>
    ),
    label: "功能分流",
    title: "功能分流",
    body: (
      <>
        {"主页只罗列会议信息 & 核心功能入口，通过控件的有序排布 & 冷静克制的视觉元素"}
        <HighlightText>让用户在 3 秒内完成「我在哪 → 我要干嘛 → 点哪里」的判断。</HighlightText>
        {"后续，当用户形成了一定的使用习惯后，"}
        <HighlightText>将不不再逐个寻找按钮，而是直接“下意识判断”。</HighlightText>
      </>
    ),
    placeholder: "功能分流示意图",
    imageSrc: "/img/Rooms/主页介绍.png",
  },
  {
    key: "controls",
    icon: (isActive) => (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity={isActive ? 0.5 : 0.25} d="M21.375 19.1C23.8592 19.1 25.9955 20.5787 26.957 22.7035L27.0234 22.85H30.375C31.6867 22.85 32.75 23.9133 32.75 25.225C32.75 26.5366 31.6867 27.6 30.375 27.6H27.0234L26.957 27.7465C25.9955 29.8712 23.8592 31.35 21.375 31.35C18.8908 31.35 16.7545 29.8712 15.793 27.7465L15.7266 27.6H5.625C4.31334 27.6 3.25 26.5366 3.25 25.225C3.25 23.9133 4.31334 22.85 5.625 22.85H15.7266L15.793 22.7035C16.7545 20.5787 18.8908 19.1 21.375 19.1ZM21.4502 22.9496C20.2076 22.9496 19.2004 23.9572 19.2002 25.1996C19.2002 26.4422 20.2076 27.4496 21.4502 27.4496C22.6927 27.4494 23.7002 26.4422 23.7002 25.1996L23.6885 24.9691C23.5729 23.835 22.6148 22.9497 21.4502 22.9496ZM14.625 4.59998C17.1092 4.59998 19.2455 6.07872 20.207 8.20349L20.2734 8.34998H30.375C31.6867 8.34998 32.75 9.41332 32.75 10.725C32.75 12.0366 31.6867 13.1 30.375 13.1H20.2734L20.207 13.2465C19.2455 15.3712 17.1092 16.85 14.625 16.85C12.1408 16.85 10.0045 15.3712 9.04297 13.2465L8.97656 13.1H5.625C4.31331 13.1 3.25 12.0366 3.25 10.725C3.25 9.41333 4.31331 8.34998 5.625 8.34998H8.97656L9.04297 8.20349C10.0045 6.07872 12.1408 4.59998 14.625 4.59998ZM14.5498 8.44958C13.3074 8.44973 12.3 9.45724 12.2998 10.6996C12.2998 11.8644 13.1851 12.8223 14.3193 12.9379L14.5498 12.9496C15.7924 12.9496 16.7998 11.9422 16.7998 10.6996L16.7881 10.4691C16.6725 9.33492 15.7146 8.44958 14.5498 8.44958Z" fill={isActive ? "#FFFFFFBF" : "#B9B9B9"} stroke="url(#paint0_linear_controls)" stroke-width="0.5"/>
        <defs>
          <linearGradient id="paint0_linear_controls" x1="18" y1="4.34998" x2="18" y2="31.6" gradientUnits="userSpaceOnUse">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity={isActive ? 0.5 : 0.25}/>
          </linearGradient>
        </defs>
      </svg>
    ),
    label: "会中控制",
    title: "会中控制",
    body: (
      <>
        {"会中最高频的操作是开关麦克风和摄像头，所以这两个控件放在最显眼的位置，形成独立的「音视频控制块」。音量调节、摄像头方向控制聚合在同一区域。"}
        <HighlightText>摄像头控制支持点按（1 秒转动）和长按（按住持续转动）</HighlightText>
        {"，两种操作方式对应不同的使用场景。"}
      </>
    ),
    placeholder: "会中音视频控制截图",
    images: [
      { src: "/img/Rooms/会中主页.png", alt: "会中主页界面截图" },
      { src: "/img/Rooms/摄像头控制.png", alt: "摄像头控制界面截图" },
    ],
  },
  {
    key: "participants",
    icon: (isActive) => (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity={isActive ? 0.5 : 0.25} d="M18 18.1211C22.2931 18.1211 25.0146 21.4358 25.7939 22.5146C25.9965 22.795 26.1613 23.0841 26.3037 23.3428C26.9279 24.4769 27.2057 25.7845 26.959 26.9648C26.7028 28.1897 25.886 29.2196 24.4883 29.6641C22.985 30.1421 20.894 30.5 18 30.5C15.1061 30.5 13.015 30.1421 11.5117 29.6641C10.1141 29.2195 9.29721 28.1897 9.04102 26.9648C8.79423 25.7844 9.07293 24.477 9.69727 23.3428C9.83964 23.0841 10.0035 22.795 10.2061 22.5146C10.9853 21.4359 13.7068 18.1212 18 18.1211ZM25.6924 18.374C29.5726 18.3762 32.0344 21.4216 32.7412 22.416C32.9243 22.6735 33.073 22.9384 33.2021 23.1768C33.7672 24.2199 34.0189 25.4216 33.7959 26.5059C33.5645 27.6306 32.8273 28.5735 31.5684 28.9805C30.829 29.2194 29.9316 29.4247 28.8457 29.5635C29.2282 28.9372 29.4994 28.2493 29.6504 27.5273C30.0611 25.563 29.5762 23.5867 28.7119 22.0166C28.56 21.7407 28.3296 21.3291 28.0234 20.9053C27.6708 20.4171 26.887 19.4025 25.6924 18.374ZM10.2949 18.3848C9.10744 19.4094 8.32789 20.4189 7.97656 20.9053C7.6705 21.3291 7.43996 21.7407 7.28809 22.0166C6.42385 23.5867 5.93895 25.5631 6.34961 27.5273C6.4959 28.2269 6.75432 28.8952 7.11816 29.5059C6.21523 29.3703 5.45214 29.1884 4.80859 28.9805C3.54952 28.5736 2.81249 27.6307 2.58105 26.5059C2.358 25.4216 2.6088 24.2199 3.17383 23.1768C3.30294 22.9384 3.45177 22.6735 3.63477 22.416C4.31765 21.4553 6.63923 18.5803 10.2949 18.3848ZM10.7686 7C10.104 8.19156 9.72559 9.56475 9.72559 11.0254C9.72569 13.3407 10.6767 15.434 12.209 16.9355C11.7536 17.0748 11.271 17.1513 10.7705 17.1514C8.01794 17.1514 5.7793 14.8822 5.7793 12.0752C5.7795 9.26897 8.01688 7.00091 10.7686 7ZM25.7705 7C28.5228 7.00016 30.7605 9.26851 30.7607 12.0752C30.7607 14.8821 28.5229 17.1512 25.7705 17.1514C25.1207 17.1514 24.5006 17.0235 23.9316 16.7939C25.3813 15.3037 26.2753 13.269 26.2754 11.0254C26.2754 9.57604 25.9012 8.21347 25.2461 7.02832C25.4183 7.01005 25.5934 7 25.7705 7ZM18 5.5C21.0514 5.5 23.5254 7.97402 23.5254 11.0254C23.5252 14.0766 21.0512 16.5498 18 16.5498C14.9489 16.5497 12.4758 14.0765 12.4756 11.0254C12.4756 7.97411 14.9487 5.50014 18 5.5Z" fill={isActive ? "#FFFFFFBF" : "#B9B9B9"} stroke="url(#paint0_linear_participants)" stroke-width="0.5"/>
        <defs>
          <linearGradient id="paint0_linear_participants" x1="18.1882" y1="5.25" x2="18.1882" y2="30.7499" gradientUnits="userSpaceOnUse">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity={isActive ? 0.5 : 0.25}/>
          </linearGradient>
        </defs>
      </svg>
    ),
    label: "参会人",
    title: "参会人管理",
    body: (
      <>
        {"参会人列表是会控中信息密度最高的页面。支持搜索会议室和其他用户发起呼叫，搜索支持多关键词保序匹配。参会人按角色排序：本人 → 主持人 → 联席主持人 → 共享人 → 开麦用户 → 普通用户。"}
        <HighlightText>每个参会人展示头像、姓名、角色标签、麦克风/摄像头状态。</HighlightText>
      </>
    ),
    placeholder: "参会人列表截图",
    images: [
      { src: "/img/Rooms/参会人页.png", alt: "参会人列表界面截图" },
    ],
  },
  {
    key: "display",
    icon: (isActive) => (
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity={isActive ? 0.5 : 0.25} d="M9 4.75H27C29.3472 4.75 31.25 6.65279 31.25 9V23.25C31.25 25.5972 29.3472 27.5 27 27.5H25.9951L27.3994 28.9043C28.034 29.5389 28.034 30.5675 27.3994 31.2021C26.7648 31.8366 25.7361 31.8367 25.1016 31.2021L21.3994 27.5H14.6016L10.8994 31.2021C10.2648 31.8367 9.23519 31.8367 8.60059 31.2021C7.96634 30.5676 7.96628 29.5388 8.60059 28.9043L10.0049 27.5H9C6.65279 27.5 4.75 25.5972 4.75 23.25V9C4.75 6.65279 6.65279 4.75 9 4.75ZM10.5 14C9.11929 14 8 15.1193 8 16.5C8 17.8807 9.11929 19 10.5 19C11.8807 19 13 17.8807 13 16.5C13 15.1193 11.8807 14 10.5 14ZM18 14C16.6193 14 15.5 15.1193 15.5 16.5C15.5 17.8807 16.6193 19 18 19C19.3807 19 20.5 17.8807 20.5 16.5C20.5 15.1193 19.3807 14 18 14ZM25.5 14C24.1193 14 23 15.1193 23 16.5C23 17.8807 24.1193 19 25.5 19C26.8807 19 28 17.8807 28 16.5C28 15.1193 26.8807 14 25.5 14Z" fill={isActive ? "#FFFFFFBF" : "#B9B9B9"} stroke="url(#paint0_linear_display)" stroke-width="0.5"/>
        <defs>
          <linearGradient id="paint0_linear_display" x1="18" y1="4.5" x2="18" y2="31.9283" gradientUnits="userSpaceOnUse">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity={isActive ? 0.5 : 0.25}/>
          </linearGradient>
        </defs>
      </svg>
    ),
    label: "大屏",
    title: "大屏 & 主持人",
    body: (
      <>
        {"大屏展示跟随会议状态自动切换布局 — 有共享时采用「演讲者 PPT 布局」，无共享时采用「自适应布局」（最大 4×4）。"}
      </>
    ),
    placeholder: "大屏显示布局截图",
    images: [
      { src: "/img/Rooms/大屏.png", alt: "大屏显示布局截图", noBorderRadius: true },
    ],
  },
]

function RoomTabButton({
  tab,
  isActive,
  onClick,
}: {
  tab: RoomTab
  isActive: boolean
  onClick: () => void
}) {
  const { ref, glowVisible } = useCursorGlow({ enabled: !isActive })

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="room-tab-btn"
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

export default function WorkWaveRoomsPage() {
  const [activeTab, setActiveTab] = useState("routing")

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
              {"Wave Rooms"}
            </h1>
            <Divider />
            <p className="text-body" style={{ margin: 0 }}>
              {"Wave Rooms 是米哈游内部的会议室控制系统，由门口水牌和室内会控两个子系统组成。两者都运行在廉价嵌入式 Android 平板上 — 屏幕素质参差、24 小时开机、用户每天仅触碰两三次。"}
              <HighlightText>硬件的限制，反而成为了设计系统本身。</HighlightText>
            </p>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"关键词"}</p>
                <p className="text-body" style={bodyStyle}>{"会议室控制 / 嵌入式设备 / Android / 交互设计"}</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"工作内容"}</p>
                <p className="text-body" style={bodyStyle}>
                  {"UI/UX 设计师 | 独立 0-1 设计会议室门口水牌与室内会控终端的完整交互与视觉方案"}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"项目年份"}</p>
                <p className="text-body" style={bodyStyle}>{"2025"}</p>
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
            {/* Block A — Hero image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/Rooms/封面.png"
              alt="Wave Rooms 产品主视觉截图"
              style={{ width: "100%", height: "auto", borderRadius: 12 }}
            />

            <Divider />

            {/* Block B — 设计挑战 */}
            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"挑战"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"廉价 Android 平板的色彩还原五花八门，同一组色值在不同设备上可能是完全不同的颜色。用户每天只碰屏幕两三次，每次几秒。设备 24 小时开机，烧屏风险真实存在。物理外壳由其他团队设计，UI 定稿时还不知道边缘会不会被遮挡。"}
                <HighlightText>这些「限制」不是需要克服的障碍 — 它们就是设计系统本身。</HighlightText>
              </p>
            </div>

            <Divider />

            {/* Block C — 核心理念 */}
            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"核心理念"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"水牌挂在门口，用户在 15 米外扫一眼就要获取会议室状态；会控放在桌面，用户在 30 厘米内长时间操作。"}
                <HighlightText>同一个产品，两块屏幕，距离决定了设计的一切。</HighlightText>
              </p>
            </div>

            {/* 双栏对比：15m vs 30cm */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12,
              }}
            >
              <div style={{ ...styles.subCard, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <svg style={{ flexShrink: 0 }} width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="52" height="52" fill="#2A2C34" />
                    <path opacity="0.25" d="M10.833 8.08334H41.166C44.4797 8.08334 47.166 10.7696 47.166 14.0833V37.9164C47.166 41.2301 44.4797 43.9164 41.166 43.9164H10.833C7.5193 43.9164 4.83301 41.2301 4.83301 37.9164V14.0833C4.83301 10.7696 7.5193 8.08334 10.833 8.08334ZM21.125 36.3333C19.9514 36.3333 19 37.2847 19 38.4583C19 39.6319 19.9514 40.5833 21.125 40.5833H30.875C32.0485 40.5832 33 39.6318 33 38.4583C33 37.2848 32.0485 36.3335 30.875 36.3333H21.125Z" fill="#A7A7C3" stroke="white" />
                  </svg>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, overflow: "hidden" }}>
                    <p className="text-body-medium" style={{ margin: 0 }}>
                      {"水牌（远距离）"}
                    </p>
                    <p className="text-body" style={{ margin: 0, fontSize: 14, color: colors.neutral[400], whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {"15 米外一眼可读，极简信息，大按钮"}
                    </p>
                  </div>
                </div>
                <div style={{ width: "100%", height: 1, backgroundColor: colors.dark[50] }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: SIGNAGE_BLUE, flexShrink: 0 }} />
                    <p className="text-body" style={{ margin: 0, fontSize: 14 }}>
                      {"大面积高饱和色块"}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: SIGNAGE_RED, flexShrink: 0 }} />
                    <p className="text-body" style={{ margin: 0, fontSize: 14 }}>
                      {"蓝（空闲）/ 红（使用中）"}
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ ...styles.subCard, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <svg style={{ flexShrink: 0 }} width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.25" d="M13 7H39C42.3137 7 45 9.68629 45 13V33.583C45 36.8967 42.3137 39.583 39 39.583H37.2139L39.4795 41.8486C40.3418 42.711 40.3417 44.1093 39.4795 44.9717C38.6171 45.8341 37.2189 45.8341 36.3564 44.9717L30.9678 39.583H21.0332L15.6445 44.9717C14.7821 45.834 13.3839 45.8341 12.5215 44.9717C11.6594 44.1093 11.6592 42.711 12.5215 41.8486L14.7871 39.583H13C9.68629 39.583 7 36.8967 7 33.583V13L7.00781 12.6914C7.16843 9.52111 9.78979 7 13 7ZM15.167 20.083C13.096 20.083 11.4172 21.7621 11.417 23.833C11.417 25.9041 13.0959 27.583 15.167 27.583C17.2379 27.5828 18.917 25.904 18.917 23.833C18.9168 21.7622 17.2378 20.0832 15.167 20.083ZM26 20.083C23.929 20.083 22.2502 21.7621 22.25 23.833C22.25 25.9041 23.9289 27.583 26 27.583C28.0711 27.583 29.75 25.9041 29.75 23.833C29.7498 21.7621 28.071 20.083 26 20.083ZM36.833 20.083C34.7622 20.0832 33.0832 21.7622 33.083 23.833C33.083 25.904 34.7621 27.5828 36.833 27.583C38.9041 27.583 40.583 25.9041 40.583 23.833C40.5828 21.7621 38.904 20.083 36.833 20.083Z" fill="#A7A7C3" stroke="white" strokeLinecap="round" />
                  </svg>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, overflow: "hidden" }}>
                    <p className="text-body-medium" style={{ margin: 0 }}>
                      {"会控（近距离）"}
                    </p>
                    <p className="text-body" style={{ margin: 0, fontSize: 14, color: colors.neutral[400], whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {"不喧宾夺主，省电护设备，功能分流 + 组块化"}
                    </p>
                  </div>
                </div>
                <div style={{ width: "100%", height: 1, backgroundColor: colors.dark[50] }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: colors.dark[900], border: `1px solid ${colors.dark[50]}`, flexShrink: 0 }} />
                    <p className="text-body" style={{ margin: 0, fontSize: 14 }}>
                      {"暗色背景，低饱和度"}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: colors.dark[700], border: `1px solid ${colors.dark[50]}`, flexShrink: 0 }} />
                    <p className="text-body" style={{ margin: 0, fontSize: 14 }}>
                      {"功能分流 + 组块化"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Divider />

            {/* Block D — 色彩系统 */}
            <div style={{ ...styles.featureRow, justifyContent: "center" }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content" }}>
                {"色彩系统"}
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/Rooms/色彩系统.png"
              alt="Wave Rooms 色彩系统规范"
              style={{ width: "calc(100% - 24px)", height: "auto", borderRadius: 12, margin: 12 }}
            />

            {chevronDivider}

            {/* Block E — 水牌 */}
            <Divider />
            <div style={{ ...styles.featureRow, justifyContent: "center" }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content" }}>{"水牌"}</p>
            </div>
            <CitationBar>
              <p className="text-body" style={{ ...bodyStyle, margin: 0 }}>
                {"挂在会议室门口的 Android 平板。大面积色块传递状态 —"}
                <HighlightText>{`#006EFA 蓝色表示空闲，#F73650 红色表示使用中`}</HighlightText>
                {"，15 米外一目了然。"}
              </p>
            </CitationBar>

            {/* 水牌：蓝/红双状态 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/Rooms/水牌蓝.png"
                alt="水牌空闲状态界面截图"
                style={{ width: "calc(100% - 24px)", height: "auto", borderRadius: 12, margin: 12 }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/Rooms/水牌红.png"
                alt="水牌使用中状态界面截图"
                style={{ width: "calc(100% - 24px)", height: "auto", borderRadius: 12, margin: 12 }}
              />
            </div>

            {/* 签到交互设计 */}
            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"签到交互"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"页面中心是签到按钮，占据最大视觉权重 — 用户每天只碰屏幕两三次、每次几秒，"}
                <HighlightText>一键签到是最短路径。</HighlightText>
              </p>
            </div>

            {/* 快速预订 */}
            <div style={styles.featureRow}>
              <p className="text-body-medium" style={styles.featureTitle}>{"快速预订"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"左上角放置预定会议二维码。扫码后系统预填会议室时间、会议标题等关键信息，"}
                <HighlightText>降低预订门槛，减少手动输入。</HighlightText>
                {"位置克制，不抢签到按钮的注意力。"}
              </p>
            </div>

            {/* 签到流程截图 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/Rooms/扫描预订.png"
              alt="签到交互流程截图"
              style={{ width: "calc(100% - 24px)", height: "auto", borderRadius: 12, margin: 12 }}
            />

            {/* Block F — 会控 */}
            <Divider />
            <div style={{ ...styles.featureRow, justifyContent: "center" }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content" }}>{"会控"}</p>
            </div>
            <CitationBar>
              <p className="text-body" style={{ ...bodyStyle, margin: 0 }}>
                {"室内视频会议控制终端，放在会议桌上近距离使用。大面积暗色背景，低饱和度配色 — 在会议室这种需要专注的环境中，"}
                <HighlightText>控制屏不应该用高饱和色抢夺注意力。</HighlightText>
                {"同时暗色背景省电，延长 24 小时开机的设备寿命。"}
              </p>
            </CitationBar>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/Rooms/会控枚举.png"
              alt="会控终端整体界面预览截图"
              style={{ width: "100%", height: "auto", borderRadius: 12 }}
            />

            {/* 会控详情 Tab */}
            <div style={{ display: "flex", flexDirection: "row", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              {ROOM_TABS.map((tab) => {
                const isActive = activeTab === tab.key
                return (
                  <RoomTabButton
                    key={tab.key}
                    tab={tab}
                    isActive={isActive}
                    onClick={() => setActiveTab(tab.key)}
                  />
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {(() => {
                  const tab = ROOM_TABS.find((t) => t.key === activeTab)!
                  return (
                    <>
                      <div style={styles.featureRow}>
                        <p className="text-body-medium" style={styles.featureTitle}>{tab.title}</p>
                        <p className="text-body" style={styles.featureDesc}>{tab.body}</p>
                      </div>
                      {tab.images ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 0 }}>
                          {tab.images.map((img) => (
                            <img
                              key={img.src}
                              src={img.src}
                              alt={img.alt}
                              style={{ width: "calc(100% - 24px)", height: "auto", borderRadius: img.noBorderRadius ? 0 : 12, margin: 12 }}
                            />
                          ))}
                        </div>
                      ) : tab.imageSrc ? (
                        <img
                          src={tab.imageSrc}
                          alt={tab.placeholder}
                          style={{ width: "calc(100% - 24px)", height: "auto", borderRadius: 12, margin: 12 }}
                        />
                      ) : (
                        <div role="img" aria-label={tab.placeholder} style={placeholderBox}>
                          <p style={{ margin: 0, fontSize: text.body.fontSize, color: colors.neutral[500], fontWeight: 500 }}>
                            {`${tab.placeholder}（截图待补充）`}
                          </p>
                        </div>
                      )}
                    </>
                  )
                })()}
              </motion.div>
            </AnimatePresence>

            <Divider />

            {/* Block G — 嵌入式 UI 设计经验 */}
            <div style={{ ...styles.featureRow, justifyContent: "center" }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content" }}>
                {"嵌入式 UI 设计经验"}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* G.0 少即是多 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={styles.featureRow}>
                  <p className="text-body-medium" style={styles.featureTitle}>
                    {"少即是多"}
                  </p>
                  <p className="text-body" style={styles.featureDesc}>
                    {"会议室水牌（或者说嵌入式用户界面）与我们日常使用的 PC、移动端或穿戴设备不同 — 用户并不是每天都会使用，甚至每周、每月才会用一次。所以此类设备的 UI 不一定要精致，最重要的是：界面与交互逻辑要简单，操作按钮要大。这样设计不仅易于使用，还有利于减少误操作的概率。"}
                    <HighlightText>交互逻辑简单 + 操作按钮大 = 降低误操作概率。</HighlightText>
                  </p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/Rooms/少即是多.png"
                  alt="少即是多 — 嵌入式 UI 简化交互设计示例"
                  style={{ width: "calc(100% - 24px)", height: "auto", borderRadius: 12, margin: 12 }}
                />
              </div>

              {/* G.1 设备廉价色彩失真 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={styles.featureRow}>
                  <p className="text-body-medium" style={styles.featureTitle}>
                    {"设备廉价色彩失真"}
                  </p>
                  <p className="text-body" style={styles.featureDesc}>
                    {"廉价嵌入式屏幕的色彩还原和设计师的专业显示器差距很大 — 同一组 RGB 值，在专业显示器上是沉稳的红色，到了嵌入式平板上直接变成了刺眼的「火龙果色」。后来我把设备摆在工位上，用 Figma Mirror 边设计边对照，才真正解决色彩还原的问题。"}
                    <HighlightText>别在专业显示器上猜嵌入式屏幕的颜色 — 把真机摆上桌面，用 Figma Mirror 边做边调。</HighlightText>
                  </p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/Rooms/火龙果.png"
                  alt="设备色彩失真 — 廉价屏幕色彩偏差对比"
                  style={{ width: "calc(100% - 24px)", height: "auto", borderRadius: 12, margin: 12 }}
                />
              </div>

              {/* G.2 出血遮挡 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={styles.featureRow}>
                  <p className="text-body-medium" style={styles.featureTitle}>
                    {"出血遮挡"}
                  </p>
                  <p className="text-body" style={styles.featureDesc}>
                    {"物理外壳由其他团队设计，往往在 UI 定稿后才确定。实际部署后，部分设备因外壳卡位导致边缘被遮挡，关键按钮被切掉。这条经历让我把一条规则写进了规范：外圈 24px 是禁区，不放任何关键信息或交互元素。"}
                    <HighlightText>24px 出血不是"留白"，是给硬件的容错空间。</HighlightText>
                  </p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/Rooms/出血问题.png"
                  alt="出血遮挡 — 物理外壳遮挡 UI 边缘示例"
                  style={{ width: "calc(100% - 24px)", height: "auto", borderRadius: 12, margin: 12 }}
                />
              </div>

              {/* G.3 动画预算 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={styles.featureRow}>
                  <p className="text-body-medium" style={styles.featureTitle}>
                    {"动画预算全给反馈"}
                  </p>
                  <p className="text-body" style={styles.featureDesc}>
                    {"廉价硬件上每一帧动画都是风险。我的做法是把所有「动画预算」都留给交互反馈 — 按钮确认、状态切换 — 零装饰动画。功能动效优先于表现动效，这条原则在嵌入式场景下不是建议，是硬约束。"}
                    <HighlightText>签到卡死的代价，远大于少一个庆祝动画。</HighlightText>
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center", height: 56, aspectRatio: "17 / 1" }}>
                <svg width="52" height="40" viewBox="0 0 52 40" fill="none" overflow="visible">
                  <path d="M 32.842 36.508 C 29.45 41.035 22.526 41.035 19.134 36.508 L 1.651 13.174 C -2.449 7.701 1.557 0 8.506 0 L 43.471 0 C 50.42 0 54.425 7.701 50.325 13.174 L 32.842 36.508 Z" fill="rgb(39, 42, 49)" stroke="rgb(58, 61, 67)" strokeWidth="2" strokeMiterlimit="10" />
                </svg>
              </div>

              {/* G.4 EUI 防坑指南 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p className="text-body" style={styles.featureDesc}>
                  {"将以上经验提炼为一份 EUI 防坑指南，覆盖设备色彩校准、出血留白规范、动画性能预算等维度，"}
                  <HighlightText>供团队后续嵌入式 UI 项目直接复用 — 这些规则已经替团队踩过一次坑了。</HighlightText>
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/Rooms/防坑指南文档沉淀.png"
                  alt="EUI 防坑指南 — 经验沉淀为可复用规范文档"
                  style={{ width: "calc(100% - 24px)", height: "auto", borderRadius: 12, margin: 12 }}
                />
              </div>
            </div>

            {chevronDivider}

            {/* Block H — 最终成果 */}
            <div style={{ ...styles.featureRow, justifyContent: "center" }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content" }}>
                {"最终成果"}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              <div style={{ ...styles.subCard, padding: 16, textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 36, fontWeight: 600, color: SIGNAGE_BLUE, lineHeight: 1.2 }}>
                  {"78%"}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 14, color: colors.neutral[400] }}>
                  {"按钮签到率"}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: colors.neutral[500] }}>
                  {"首周 2981 / 3782 人"}
                </p>
              </div>
              <div style={{ ...styles.subCard, padding: 16, textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 36, fontWeight: 600, color: colors.neutral[50], lineHeight: 1.2 }}>
                  {"12"}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 14, color: colors.neutral[400] }}>
                  {"个月 24/7 运行"}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: colors.neutral[500] }}>
                  {"零烧屏投诉"}
                </p>
              </div>
            </div>

          </article>

          {/* ═══ Card 3: Other Projects ═══ */}
          <OtherProjects currentSlug="/work/wave-rooms" />
        </section>
      </div>
    </main>
  )
}
