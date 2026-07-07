const QUESTIONS_BY_ROUTE: Record<string, string[]> = {
  "/": [
    "白子煜有哪些项目经历？",
    "介绍一下他的工作经历",
    "他有哪些技能？",
  ],
  "/work": [
    "哪个项目最有挑战性？",
    "他在米哈游做了什么？",
    "这些项目用到了哪些设计方法？",
  ],
  "/work/fm": [
    "这个项目的主要设计挑战是什么？",
    "白子煜在其中承担了什么角色？",
    "白板一体化是怎么设计的？",
  ],
  "/work/meitu-pro": [
    "白子煜在其中承担了什么角色？",
    "交互上做了哪些优化？",
    "品牌设计有什么思考？",
  ],
  "/work/wave-rooms": [
    "嵌入式设备的设计有什么特殊考虑？",
    "会议室控制的核心功能是什么？",
    "这个项目的难点在哪？",
  ],
  "/work/lottery": [
    "抽奖系统的动效是怎么设计的？",
    "从年会到抽奖系统，设计思路有什么变化？",
    "用了什么工具做动效？",
  ],
  "/work/hoyowave": [
    "企业协作平台的设计有什么特点？",
    "IM 模块的设计思路是什么？",
    "开放平台是怎么设计的？",
  ],
  "/work/component-checker": [
    "这个插件解决了什么问题？",
    "AI 在其中发挥了什么作用？",
    "如何保证设计规范一致性？",
  ],
  "/about-us": [
    "他用什么设计工具？",
    "介绍一下他的教育背景",
    "他和其他设计师有什么不同？",
  ],
  "/contact": [
    "如何联系白子煜？",
    "他目前在找工作吗？",
    "他的期望工作城市是哪里？",
  ],
}

const FOLLOW_UP_QUESTIONS = [
  "能再详细说说吗？",
  "还有其他相关项目吗？",
  "他的设计理念是什么？",
  "他在团队中扮演什么角色？",
  "这个项目用了什么设计方法？",
  "他最大的设计优势是什么？",
]

export function getSuggestedQuestions(
  route: string,
  messageCount: number
): string[] {
  if (messageCount > 0) {
    // Shuffle and pick 3 from the pool for variety
    const shuffled = [...FOLLOW_UP_QUESTIONS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3)
  }

  const normalized = route.replace(/\/$/, "") || "/"
  return (
    QUESTIONS_BY_ROUTE[normalized] || QUESTIONS_BY_ROUTE["/"]
  )
}
