import { STATIC_KNOWLEDGE_BASE } from "./chat-system-prompt"

const PAGE_CONTEXTS: Record<string, string> = {
  "/": "访客正在浏览首页，可以看到个人介绍卡片和项目封面的浮动展示。可以推荐感兴趣的项目，引导访客深入了解。",
  "/work": "访客正在浏览项目列表页，可以看到所有 6 个项目的卡片。可以根据访客的兴趣推荐具体项目。",
  "/work/fm":
    "访客正在查看人事系统（FM）案例。这是米哈游内部人事管理系统，白子煜作为产品设计师独立完成业务梳理和概念体系搭建。页面展示了项目的 Why/Who/What 分析框架、关键设计决策、信息生产与消费的最终方案。可以深入讨论 FT 概念体系、白板一体化的设计思路、阵型表和事项卡片的交互逻辑。",
  "/work/meitu-pro":
    "访客正在查看美图秀秀 Pro 案例。这是白子煜在美图实习期间独立负责的项目，实现了 Windows、Web、Mac 三端统一。页面分为用户体验（交互重构、功能优化）和品牌设计（色彩、图标、组件）两个板块。可以深入讨论布局重构、深浅模式、图层管理、组件搭建等设计细节。",
  "/work/wave-rooms":
    "访客正在查看 Wave Rooms 案例。这是米哈游会议室控制系统，运行在廉价嵌入式 Android 平板上。页面展示了门口水牌和室内会控两个子系统的设计，以及嵌入式 UI 设计的四条核心经验（少即是多、色彩校准、出血留白、动画预算）。可以深入讨论硬件限制如何驱动设计决策。",
  "/work/lottery":
    "访客正在查看米哈游抽奖系统案例。页面展示了「换肤」机制的设计思路——将系统拆为骨架层和皮肤层，以及标准化 UI 组件、AE 动画模板化、标准化交付流程三个步骤。还有 APNG 格式的技术选型理由。可以深入讨论提效方法论和动效设计。",
  "/work/hoyowave":
    "访客正在查看 HoYoWave 案例。页面分为 IM 视觉升级和开放平台消息卡片两个板块。IM 部分展示了品牌色植入和空态彩蛋的设计策略；开放平台部分展示了 Markdown 排版规则、交互控件、模块化布局等设计系统。可以深入讨论企业协作产品的设计思路和消息卡片演进为 Bot UI 的过程。",
  "/work/component-checker":
    "访客正在查看 Component Checker 案例。这是一个 Figma 插件，页面展示了规范检查（6 项校验规则）、AI 语义描述（Gemini API 生成关键词）、设计规范生成（知识库 + AI 一键生成）三个核心功能。可以深入讨论 AI 辅助设计提效的具体方法。",
  "/about-us":
    "访客正在阅读个人介绍页，可以看到白子煜的教育背景、工作经历、专业技能、工具栈和个人爱好。可以补充页面上没有提到的细节，如具体项目贡献、设计理念等。",
  "/contact": "访客正在查看联系页面。白子煜的联系方式：邮箱 1624724153@qq.com，电话 13950014653。如果访客问求职相关问题，可以引导联系。",
}

export function buildSystemPrompt(route: string): string {
  const pageContext =
    PAGE_CONTEXTS[route] ||
    PAGE_CONTEXTS[route.replace(/\/$/, "")] ||
    ""

  const contextBlock = pageContext
    ? `## 当前页面上下文\n${pageContext}\n\n当访客提到"这个项目"或"这里"时，请根据上方页面上下文判断所指内容。`
    : ""

  return `${STATIC_KNOWLEDGE_BASE}

${contextBlock}`.trim()
}
