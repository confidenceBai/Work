"use client"

import { useState } from "react"
import ThreeWPanel, { type ThreeWSection, type ThreeWTab } from "@/components/three-w-panel"
import WhatStepSection, { type WhatStep } from "@/components/what-step-section"
import HighlightText from "@/components/highlight-text"
import OtherProjects from "@/components/other-projects"
import Divider from "@/components/divider"
import { styles } from "@/lib/design-tokens"

const SHAPES_ICON_URL = "/img/shapes-icon.png"

const PRODUCT_IMAGE_1 = "/img/fm/封面.png"
const PRODUCT_IMAGE_1B = "/img/product-1b.png"
const BRAINSTORM_STRIP = "/img/brainstorm-strip.png"
const THINKING_FRAME_IMAGE = "/img/thinking-frame.png"
const WHO_IMAGE = "/img/who-image.png"

const FINAL_SOLUTION_IMAGE = "/img/final-solution.png"
const PRODUCT_IMAGE_AI = "/img/product-ai.png"
const PRODUCT_IMAGE_DATA = "/img/product-data.png"
const PRODUCT_IMAGE_PROFILE = "/img/product-profile.png"
const WHAT_LARGE_IMAGE = "/img/what-large.png"

const labelStyle: React.CSSProperties = {
  margin: 0,
  width: "25%",
  minWidth: 90,
}

const bodyStyle: React.CSSProperties = {
  margin: 0,
  width: "100%",
}

const THREE_W_TABS: ThreeWTab[] = [
  { key: "why", label: "Why", subtitle: "为什么做？" },
  { key: "who", label: "Who", subtitle: "为谁而作？" },
  { key: "what", label: "What", subtitle: "做一个什么样的系统？" },
]

const THREE_W_SECTIONS_BY_TAB: Record<string, ThreeWSection[]> = {
  why: [
    {
      title: "人事系统痛点：",
      body:
        <div className="text-body">
          {"由于盘人、盘事分散在 2 个模块，LD 需要分别在盘人、盘事上将"}
          <HighlightText>同样的事情做 2 遍</HighlightText>
          {"，非常麻烦且"}
          <HighlightText>容易导致数据缺失</HighlightText>
          {"；系统交互逻辑、概念复杂，"}
          <HighlightText>上手成本高</HighlightText>
          {"。"}
        </div>,
      imageSrc: THINKING_FRAME_IMAGE,
      imageAlt: "Why",
      imageAfterBody: true,
      gap: 8,
    },
    {
      title: "项目痛点：",
      body:
        <div className="text-body">
          {"单项目各个阶段的演进追溯、各阶段大事记、团队历史状态切片信息、关键任务和交付结果、事项演变脉络"}
          <HighlightText>难以被记录</HighlightText>
          {"。"}
        </div>,
      gap: 8,
    },
    {
      title: "公司痛点：",
      body:
        <div className="text-body">
          {"项目很难对组织说清楚项目所处阶段的关键目标、存在的问题、团队现状等；组织也很"}
          <HighlightText>难理解多个项目</HighlightText>
          {"各自所处阶段以及资源"}
          <HighlightText>投入情况的合理性</HighlightText>
          {"等。"}
        </div>,
      gap: 8,
    },
  ],
  who: [
    {
      title: "",
      body: "",
      imageSrc: WHO_IMAGE,
      imageAlt: "Who",
      imageWidth: 1108,
    },
  ],
}

const WHAT_STEPS: WhatStep[] = [
  {
    title: "Step 1 ：搞清楚 FT 是什么（业务核心）",
    body: <>
      {"阅读各个文档主动与项目 BP & 一线 LD 求教，最终梳理出了"}
      <HighlightText>FT 概念图</HighlightText>
    </>,
    image: { src: WHAT_LARGE_IMAGE, alt: "What", width: 1148, height: 524.5 },
  },
  {
    title: "Step 2 ：不同角色在新系统中的使用流程又该如何串联（梳理动线）",
    body:
      <>
        {"回到前置分析的用户角色，以\”白板一体化\”信息生产为轴线，从上游 BP 创建 「空间」、「周期」、「FT」，到下游一线 LD 盘人盘事搭建总动线再将用户角色加入流程中，分析"}
        <HighlightText>不同用户重点停留页面与关注点</HighlightText>
        {"，对后续设计工作指明方向"}
      </>,
    image: { src: BRAINSTORM_STRIP, alt: "梳理动线", width: 1168.5, height: 200 },
  },
]

export default function WorkFmPage() {
  const [activeTab, setActiveTab] = useState("why")

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
              {"人事一体化白板"}
            </h1>
            <Divider />
            <p className="text-body" style={{ margin: 0 }}>
              {"人事一体化白板（以下简称\"FT 白板\"）是米哈游内部针对人事盘点系统进行的一项核心重构方案，旨在解决\"盘人\"（团队盘点）和\"盘事\"（任务盘点）长期数据割裂的问题。白板核心是以 FT（Feature Team，特性团队，服务游戏生产管线运作的组织管理方式） 为业务核心，各级 Leader/组长围绕其进行人员与工作事项的盘点，最终将原本分离的\"人\"与\"事\"绑定，以此提升大型项目的协同效率。"}
            </p>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"关键词"}</p>
                <p className="text-body" style={bodyStyle}>{"人事管理 / 企业协同 / AI"}</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"工作内容"}</p>
                <p className="text-body" style={bodyStyle}>
                  {"产品设计师 | 分析、定义流程和功能框架，推动从\"产品经理一句话概念\"到具体方案的落地"}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={{ ...labelStyle, width: "100%" }}>{"项目年份"}</p>
                <p className="text-body" style={bodyStyle}>{"2026"}</p>
              </div>
            </div>
          </article>

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PRODUCT_IMAGE_1}
              alt="Product showcase"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 12,
                display: "block",
              }}
            />
            <Divider />
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <p className="text-body-medium" style={labelStyle}>{"😓 挑战"}</p>
              <p className="text-body" style={bodyStyle}>
                {"该项目初期可以说是完全空白，"}
                <HighlightText>只有</HighlightText>
                {" \"白板一体化\" 这一"}
                <HighlightText>抽象的命题</HighlightText>
                {"。 上至为什么做、要达到什么成果；下至各种业务概念、角色、逻辑、流程都没有个明确的解答 & 文档沉淀，"}
                <HighlightText>一切都需要自己逐一摸索</HighlightText>
                {"。业务对设计的输入也是一些脱敏过后的案例。"}
                <HighlightText>对工作的开展造成了十分大的阻碇</HighlightText>
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PRODUCT_IMAGE_1B}
              alt="Challenge visual"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: 12,
                display: "block",
              }}
            />
            <Divider />
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <p className="text-body-medium" style={labelStyle}>{"🙋 我的解题思路"}</p>
              <p className="text-body" style={{ ...bodyStyle, textAlign: "right" }}>
                {"把问题掌开揉碎！逐个击破 🤷 🤷 🤷"}
              </p>
            </div>

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

            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <ThreeWPanel
                tabs={THREE_W_TABS}
                defaultTabKey="why"
                sectionsByTab={THREE_W_SECTIONS_BY_TAB}
                activeTabKey={activeTab}
                onTabChange={setActiveTab}
              >
                {activeTab === "what" && (
                  <WhatStepSection steps={WHAT_STEPS} />
                )}
              </ThreeWPanel>
            </div>

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

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <p className="text-body-medium" style={{ margin: 0, width: "fit-content" }}>
                {"🧠 中间省略一万步的脑爆"}
              </p>
              <p className="text-body" style={bodyStyle}>
                {"虽然已经明确了核心的概念 & 产品动线。但"}
                <HighlightText>面对一个基本没有竞品参考的全新产品</HighlightText>
                {"，许多的功能 & 细节都是摸着石头过河，好在 "}
                <HighlightText>AI Studio、Cursor</HighlightText>
                {" 等产品能"}
                <HighlightText>帮我们快速搭建原型并验证想法，将我们试错的成本大大降</HighlightText>
                {"低。"}
              </p>
            </div>

            <Divider />

            {/* 🏁 最终方案 (信息生产) */}
            <div style={{ ...styles.featureRow, justifyContent: "center" }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content" }}>
                {"🏁 最终方案 (信息生产) 🏁"}
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FINAL_SOLUTION_IMAGE}
              alt="最终方案 - 信息生产"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />

            <Divider />

            {/* 🏁 最终方案 (信息消费) */}
            <div style={{ ...styles.featureRow, justifyContent: "center" }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content" }}>
                {"🏁 最终方案 (信息消费) 🏁"}
              </p>
            </div>

            {/* 🌟 AI 问答 */}
            <div style={styles.featureRow}>
              <p style={styles.featureTitle}>{"🌟 AI 问答"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"在白板一体化"}
                <HighlightText>内置 "Fomi AI" Agent</HighlightText>
                {"，用户可以通过对话的方式快速了解、分析项目运行情况 & 运行成本。甚至可以"}
                <HighlightText>帮助用户进行快捷操作</HighlightText>
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PRODUCT_IMAGE_AI}
              alt="AI 问答"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 12,
                display: "block",
              }}
            />

            {/* 📊 数据的多样化展示 */}
            <div style={styles.featureRow}>
              <p style={styles.featureTitle}>{"📊 数据的多样化展示"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"对于更高层级的 Leader/项管来说，"}
                <HighlightText>信息的密度往往更重要</HighlightText>
                {"。此时白板的载体呈现信息就不占优了。就需要使用表格 & 甘特的形式为用户展示信息"}
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PRODUCT_IMAGE_DATA}
              alt="数据的多样化展示"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 12,
                display: "block",
              }}
            />

            {/* 🕶️ 员工档案数据穿透 */}
            <div style={styles.featureRow}>
              <p style={styles.featureTitle}>{"🕶️ 员工档案数据穿透"}</p>
              <p className="text-body" style={styles.featureDesc}>
                {"员工在白板中被填写的事项 & FT 将会"}
                <HighlightText>自动穿透至人员档案</HighlightText>
                {"中。为后续此人的"}
                <HighlightText>人事动作提供依据</HighlightText>
                {"。"}
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PRODUCT_IMAGE_PROFILE}
              alt="员工档案数据穿透"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 12,
                display: "block",
              }}
            />
          </article>

          <OtherProjects currentSlug="/work/fm" />
        </section>
      </div>
    </main>
  )
}
