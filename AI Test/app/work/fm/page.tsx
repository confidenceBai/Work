"use client"

import { useState } from "react"
import ThreeWPanel, { type ThreeWSection, type ThreeWTab } from "@/components/three-w-panel"
import WhatStepSection, { type WhatStep } from "@/components/what-step-section"
import HighlightText from "@/components/highlight-text"
import OtherProjects from "@/components/other-projects"
import CitationBar from "@/components/citation-bar"
import Divider from "@/components/divider"
import { styles } from "@/lib/design-tokens"

const PRODUCT_IMAGE_1 = "/img/fm/封面.png"
const PRODUCT_IMAGE_1B = "/img/product-1b.png"
const BRAINSTORM_STRIP = "/img/brainstorm-strip.png"
const THINKING_FRAME_IMAGE = "/img/thinking-frame.png"
const WHO_IMAGE = "/img/who-image.png"

const FINAL_CANVAS_IMAGE = "/img/fm/最终方案（画布）.png"
const FINAL_AI_IMAGE = "/img/fm/最终方案（AI）.png"
const FINAL_SOLUTION_IMAGE = "/img/final-solution.png"
const WHAT_LARGE_IMAGE = "/img/what-large.png"

const labelStyle: React.CSSProperties = {
  margin: 0,
  width: "25%",
  minWidth: 90,
}

const bodyStyle: React.CSSProperties = {
  margin: 0,
  width: "100%",
  flex: 1,
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
      title: "多层角色，关注点各不相同：",
      body:
        <div className="text-body">
          <HighlightText>{"BP（项目管理员）"}</HighlightText>
          {"作为上游角色，负责搭建 FT 架构树、配置盘点周期，是\"空间的创建者\"；"}
          <HighlightText>{"一线 Leader"}</HighlightText>
          {"是核心用户，在 FT 卡片内完成盘人（阵型表排布）和盘事（事项卡片管理）；"}
          <HighlightText>{"高层 Leader / 项管"}</HighlightText>
          {"是信息消费方，关注跨 FT 的数据聚合和资源合理性。"}
        </div>,
      imageSrc: WHO_IMAGE,
      imageAlt: "Who",
      imageWidth: 1108,
      imageAfterBody: true,
      gap: 16,
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
              {"人事系统"}
            </h1>
            <Divider />
            <div className="text-body" style={{ margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <span>{"人事系统原包含：盘人&盘事双白板、绩效系统、薪酬系统、员工档案等。"}</span>
              <span>{"本项目将重点介绍盘人&盘事双白板一体化项目（以下简称\"FT 白板\"）是米哈游内部针对人事盘点系统进行的一项核心重构方案，旨在解决\"盘人\"&\"盘事\"双白板长期数据割裂的问题。"}</span>
              <span>{"白板核心是以 FT（Feature Team，特性团队，服务游戏生产管线运作的组织管理方式） 为业务核心，各级 Leader/组长围绕其进行人员与工作事项的盘点，最终将原本分离的\"人\"与\"事\"绑定，以此提升大型项目的协同效率。"}</span>
              <span>{"核心功能链路：项目装配台 → 配置业务周期 & FT 架构树 → 用户前台 → FT 卡片 → 阵型表 / 事项卡片 → 标签与关键角色，以此产生基础业务数据并在人事下游功能被消费。"}</span>
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={labelStyle}>{"关键词"}</p>
                <p className="text-body" style={bodyStyle}>{"人事管理 / 企业协同 / AI"}</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={labelStyle}>{"工作内容"}</p>
                <p className="text-body" style={bodyStyle}>
                  {"产品设计师 | 在需求定义模糊的背景下，独立完成业务梳理、概念体系搭建与交互方案设计"}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <p className="text-body-medium" style={labelStyle}>{"项目年份"}</p>
                <p className="text-body" style={bodyStyle}>{"2025 - 2026"}</p>
              </div>
            </div>
          </article>

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
              <p className="text-body-medium" style={labelStyle}>{"挑战"}</p>
              <div className="text-body" style={{ ...bodyStyle, display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ margin: 0 }}>
                  {"该项目初期没有统一的业务术语体系。FT、空间、周期、根节点、阵型表、事项卡片等概念在团队内有多种口头叫法，缺乏明确定义。"}
                  <HighlightText>{"设计的第一步不是画界面，而是与项目 BP、一线 LD 求教，建立一套所有角色都能对齐的概念体系。"}</HighlightText>
                </p>
                <p style={{ margin: 0 }}>
                  {"白板 + FT 卡片 + 阵型表 + 事项卡片的组合形态没有现成的竞品可以参考，许多功能和交互细节需要通过快速原型验证来摸索。好在 AI 时代 Claude Code 能够帮助我们快速搭建可交互原型，大幅降低了试错成本。"}
                </p>
              </div>
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
              <p className="text-body-medium" style={styles.featureTitle}>{"我的解题思路"}</p>
              <p className="text-body" style={bodyStyle}>
                {"拆解业务概念，梳理角色动线，逐步建立设计框架"}
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

            {/* 最终方案 (信息生产) */}
            <div style={{ ...styles.featureRow, justifyContent: "center", flexDirection: "column", gap: 16 }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content", alignSelf: "center" }}>
                {"最终方案 — 信息生产"}
              </p>
              <CitationBar>
                <p className="text-body" style={{ margin: 0, maxWidth: 720 }}>
                  {"信息生产遵循\"一次配置，全链路同步\"的设计原则：上游（BP 侧）在组装站以 xmind 树形结构搭建 FT 架构并配置盘点周期，变更实时同步到前端白板；下游（Leader 侧）在统一白板上，每个 FT 节点自动呈现为 FT 卡片，通过阵型表完成盘人、通过事项卡片完成盘事；白板中填写的数据自动穿透至员工档案，为后续人事动作提供依据。"}
                </p>
              </CitationBar>
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

            {/* 最终方案 (信息消费) */}
            <div style={{ ...styles.featureRow, justifyContent: "center", flexDirection: "column", gap: 16 }}>
              <p className="text-h4" style={{ margin: 0, width: "fit-content", alignSelf: "center" }}>
                {"最终方案 - 关键页面"}
              </p>
              <CitationBar>
                <p className="text-body" style={{ margin: 0, maxWidth: 720 }}>
                  {"信息消费遵循一个核心原则：不同层级的用户需要不同粒度的信息聚合。项目管理员（BP）使用装配台配置项目结构、周期、职能定义、各类标签；一线 Leader 在用户前台画布上直接操作，盘人盘事，所见即所得；高层 Leader 和项管需要跨 FT 的数据密度，因此提供表格和甘特图视图。"}
                </p>
              </CitationBar>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FINAL_CANVAS_IMAGE}
              alt="最终方案 - 画布"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />

            <CitationBar>
              <p className="text-body" style={{ margin: 0, maxWidth: 720 }}>
                {"除了画布的基础能力外，项目还支持了 AI 问答能力，用户用户通过自然语言提问，可以快速了解、创建、甚至是编辑画布已有内容。"}
              </p>
            </CitationBar>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FINAL_AI_IMAGE}
              alt="最终方案 - AI"
              style={{
                width: "100%",
                height: "auto",
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
