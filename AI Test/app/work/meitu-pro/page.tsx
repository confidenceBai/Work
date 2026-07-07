"use client"

import { useState } from "react"
import ThreeWPanel, { type ThreeWSection, type ThreeWTab } from "@/components/three-w-panel"
import OtherProjects from "@/components/other-projects"
import Divider from "@/components/divider"
import { colors, styles } from "@/lib/design-tokens"

const COVER = "/img/meitu-pro/封面.png"
const BG_PROBLEM_1 = "/img/meitu-pro/背景-问题-1.png"
const LAYOUT_PROBLEM_1 = "/img/meitu-pro/布局问题-1.png"
const LAYOUT_PROBLEM_2 = "/img/meitu-pro/布局痛点2.jpg"
const LAYOUT_ISSUE_2 = "/img/meitu-pro/布局问题-2.png"
const FUNC_ARCH_1 = "/img/meitu-pro/功能架构-1.png"
const FUNC_ARCH_2 = "/img/meitu-pro/功能架构-2.png"
const FUNC_ARCH_3 = "/img/meitu-pro/功能架构-3.png"
const STARTUP = "/img/meitu-pro/启动页.png"
const PANEL_RIGHT = "/img/meitu-pro/左右面板-2.png"
const SHORTCUT = "/img/meitu-pro/快捷键.png"
const LAYER = "/img/meitu-pro/图层面板.png"
const FEATURE_GUIDE = "/img/meitu-pro/功能引导.png"
const COMPARE = "/img/meitu-pro/对比功能.png"
const AUTO_SAVE = "/img/meitu-pro/自动保存.png"
const COLOR_SPEC = "/img/meitu-pro/色彩规范.png"
const DARK_LIGHT = "/img/meitu-pro/深浅模式.png"
const VIP_COLOR = "/img/meitu-pro/会员色.png"
const ICON_SPEC = "/img/meitu-pro/图标规范.png"
const ICON_SET = "/img/meitu-pro/图标绘制.png"
const FONT_SPEC = "/img/meitu-pro/字体规范.png"
const SPACING = "/img/meitu-pro/圆角间距.png"
const COMPONENTS = "/img/meitu-pro/组件搭建.png"

const labelStyle: React.CSSProperties = {
  margin: 0,
  width: "25%",
  minWidth: 90,
}

const bodyStyle: React.CSSProperties = {
  margin: 0,
  width: "100%",
}

const CHEVRON = (
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

const MEITU_TABS: ThreeWTab[] = [
  { key: "ux", label: "用户体验", subtitle: "交互重构 · 功能优化" },
  { key: "brand", label: "品牌设计", subtitle: "色彩 · 图标 · 组件" },
]

const UX_SECTIONS: ThreeWSection[] = [
  {
    title: "",
    body: null,
    imageSrc: BG_PROBLEM_1,
    imageAlt: "项目背景",
    gap: 16,
  },
  {
    title: "布局痛点",
    body: null,
    imageSrc: LAYOUT_PROBLEM_1,
    imageAlt: "布局问题",
    gap: 8,
  },
  {
    title: "",
    body: null,
    imageSrc: LAYOUT_PROBLEM_2,
    imageAlt: "首页信息冗余",
    gap: 16,
  },
  {
    title: "",
    body: null,
    imageSrc: LAYOUT_ISSUE_2,
    imageAlt: "布局问题-2",
    gap: 16,
  },
  {
    title: "",
    body: null,
    imageSrc: FUNC_ARCH_1,
    imageAlt: "功能框架梳理 - 海报设计",
    gap: 16,
  },
  {
    title: "",
    body: null,
    imageSrc: FUNC_ARCH_2,
    imageAlt: "功能框架梳理 - 图片编辑",
    gap: 16,
  },
  {
    title: "启动页与工具箱",
    body: null,
    imageSrc: FUNC_ARCH_3,
    imageAlt: "启动页与工具箱",
    gap: 8,
  },
  {
    title: "",
    body: null,
    imageSrc: PANEL_RIGHT,
    imageAlt: "布局与交互调整",
    gap: 16,
  },
  {
    title: "功能引导",
    body: null,
    imageSrc: FEATURE_GUIDE,
    imageAlt: "功能效果演示及介绍",
    gap: 8,
  },
  {
    title: "快捷键系统",
    body: null,
    imageSrc: SHORTCUT,
    imageAlt: "快捷键引入",
    gap: 8,
  },
  {
    title: "图层管理",
    body: null,
    imageSrc: LAYER,
    imageAlt: "图层功能",
    gap: 8,
  },
  {
    title: "作图记录自动保存",
    body: null,
    imageSrc: AUTO_SAVE,
    imageAlt: "作图记录功能",
    gap: 16,
  },
]

const BRAND_SECTIONS: ThreeWSection[] = [
  {
    title: "用色规范",
    body: null,
    imageSrc: COLOR_SPEC,
    imageAlt: "色彩规范",
    gap: 8,
  },
  {
    title: "",
    body: null,
    imageSrc: DARK_LIGHT,
    imageAlt: "深浅模式切换",
    gap: 16,
  },
  {
    title: "会员色更改",
    body: null,
    imageSrc: VIP_COLOR,
    imageAlt: "会员色更改",
    gap: 16,
  },
  {
    title: "图标规范",
    body: null,
    imageSrc: ICON_SPEC,
    imageAlt: "图标规范",
    gap: 8,
  },
  {
    title: "",
    body: null,
    imageSrc: ICON_SET,
    imageAlt: "图标集",
    gap: 16,
  },
  {
    title: "字体规范",
    body: null,
    imageSrc: FONT_SPEC,
    imageAlt: "字体规范",
    gap: 16,
  },
  {
    title: "圆角与间距",
    body: null,
    imageSrc: SPACING,
    imageAlt: "圆角与间距",
    gap: 16,
  },
  {
    title: "组件搭建",
    body: null,
    imageSrc: COMPONENTS,
    imageAlt: "组件搭建",
    gap: 8,
  },
]

export default function WorkMeituProPage() {
  const [activeTab, setActiveTab] = useState("ux")

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "clip",
      }}
    >
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
          {/* Card 1: Header */}
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
              {"美图秀秀 Pro"}
            </h1>
            <Divider />
            <div className="text-body" style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <span>{"美图秀秀 Pro 是美图公司桌面端产品的三端统一改版项目。原版桌面端视觉风格老旧、界面杂乱、功能不完整，且从未推出 Mac 版本。项目目标是统一 Windows / Web / Mac 三端体验，从用户体验、品牌特性和视觉设计三个维度进行全面升级。"}</span>
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"关键词"}</p>
                <p className="text-body" style={bodyStyle}>{"图片编辑 / 桌面端 / 设计系统 / 三端统一"}</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"工作内容"}</p>
                <p className="text-body" style={bodyStyle}>
                  {"UI/UX 设计师 | 负责三端统一改版的完整设计流程，包括交互重构、品牌规范制定与组件系统搭建"}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"项目年份"}</p>
                <p className="text-body" style={bodyStyle}>{"2022"}</p>
              </div>
            </div>
          </article>

          {/* Card 2: Showcase */}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={COVER}
              alt="美图秀秀 Pro 封面"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 12,
                display: "block",
              }}
            />
            <Divider />

            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <ThreeWPanel
                tabs={MEITU_TABS}
                defaultTabKey="ux"
                sectionsByTab={{
                  ux: UX_SECTIONS,
                  brand: BRAND_SECTIONS,
                }}
                activeTabKey={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
          </article>

          {/* Card 3: Other Projects */}
          <OtherProjects currentSlug="/work/meitu-pro" />
        </section>
      </div>
    </main>
  )
}
