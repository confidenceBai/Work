import { NextRequest } from "next/server"

const MIMO_HOST = "token-plan-cn.xiaomimimo.com"
const MIMO_PATH = "/v1/chat/completions"

// Security constants
const MAX_REQUESTS_PER_MINUTE = 20
const MAX_MESSAGES = 50
const MAX_TOTAL_CONTENT_LENGTH = 20000
const MAX_SINGLE_MESSAGE_LENGTH = 8000
const MAX_BODY_SIZE = 100 * 1024 // 100KB

// In-memory rate limiter
const rateLimitMap = new Map<string, { start: number; count: number }>()
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  if (!record || now - record.start > 60000) {
    rateLimitMap.set(ip, { start: now, count: 1 })
    return true
  }
  record.count++
  return record.count <= MAX_REQUESTS_PER_MINUTE
}

// Prompt injection patterns
const INJECTION_PATTERNS = [
  /忽略.{0,10}(之前|以上|所有).{0,10}(指令|提示|规则)/i,
  /ignore.{0,10}(previous|above|all).{0,10}(instructions|prompts|rules)/i,
  /you are now/i,
  /你现在是/i,
  /system\s*prompt/i,
  /系统提示/i,
  /act\s*as/i,
  /pretend\s*to\s*be/i,
  /假装是/i,
  /扮演/i,
  /输出.{0,10}(系统|提示词|prompt)/i,
  /reveal.{0,10}(system|prompt)/i,
]

function hasInjectionAttempt(
  messages: Array<{ role: string; content: string }>
): boolean {
  return messages.some((msg) => {
    if (msg.role !== "user") return false
    return INJECTION_PATTERNS.some((p) => p.test(msg.content))
  })
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.MIMO_API_KEY
  if (!apiKey) {
    return Response.json(
      { error: "API key not configured" },
      { status: 500 }
    )
  }

  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "请求过于频繁，请稍后再试" },
      { status: 429 }
    )
  }

  // Body size check
  const rawBody = await request.text()
  if (rawBody.length > MAX_BODY_SIZE) {
    return Response.json({ error: "请求体过大" }, { status: 413 })
  }

  // Parse body
  let body: {
    messages: Array<{ role: string; content: string }>
    stream?: boolean
  }
  try {
    body = JSON.parse(rawBody)
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    )
  }

  // Validate messages
  if (!body?.messages?.length) {
    return Response.json({ error: "Missing messages" }, { status: 400 })
  }

  if (body.messages.length > MAX_MESSAGES) {
    return Response.json(
      { error: "消息数量超出限制" },
      { status: 400 }
    )
  }

  // Content length validation
  let totalLength = 0
  for (const msg of body.messages) {
    if (typeof msg.content !== "string") continue
    if (msg.content.length > MAX_SINGLE_MESSAGE_LENGTH) {
      msg.content = msg.content.slice(0, MAX_SINGLE_MESSAGE_LENGTH)
    }
    totalLength += msg.content.length
  }
  if (totalLength > MAX_TOTAL_CONTENT_LENGTH) {
    return Response.json({ error: "消息内容过长" }, { status: 400 })
  }

  // Prompt injection guard
  if (hasInjectionAttempt(body.messages)) {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            `data: ${JSON.stringify({ choices: [{ delta: { content: "这个问题超出了我的能力范围，请问一些关于白子煜作品集相关的问题吧！" } }] })}\n\ndata: [DONE]\n`
          )
        )
        controller.close()
      },
    })
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  }

  // Forward to MiMo API
  const apiKeyHeader = apiKey
  const upstreamRes = await fetch(`https://${MIMO_HOST}${MIMO_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKeyHeader,
    },
    body: JSON.stringify({
      model: "mimo-v2.5",
      messages: body.messages,
      stream: true,
    }),
  })

  if (!upstreamRes.ok) {
    const errorBody = await upstreamRes.text().catch(() => "")
    return Response.json(
      {
        error: `Upstream error (${upstreamRes.status})`,
        detail: errorBody,
      },
      { status: upstreamRes.status }
    )
  }

  // Proxy the SSE stream
  return new Response(upstreamRes.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
