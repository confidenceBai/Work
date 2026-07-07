const https = require("https")

const MIMO_HOST = "token-plan-cn.xiaomimimo.com"
const MIMO_PATH = "/v1/chat/completions"

// Security constants
const MAX_REQUESTS_PER_MINUTE = 20
const MAX_MESSAGES = 50
const MAX_TOTAL_CONTENT_LENGTH = 20000
const MAX_SINGLE_MESSAGE_LENGTH = 8000
const MAX_BODY_SIZE = 100 * 1024 // 100KB
const ALLOWED_ORIGINS = [
  "https://zoebai.com",
  "https://www.zoebai.com",
  "http://localhost:3000",
]
const ALLOWED_ORIGIN_PATTERNS = [
  /\.vercel\.app$/,
]

// In-memory rate limiter (per instance)
const rateLimitMap = new Map()
function checkRateLimit(ip) {
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

function hasInjectionAttempt(messages) {
  return messages.some((msg) => {
    if (msg.role !== "user") return false
    return INJECTION_PATTERNS.some((p) => p.test(msg.content))
  })
}

exports.main = async (event, context) => {
  const apiKey = process.env.MIMO_API_KEY
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "API key not configured" }),
    }
  }

  // CORS
  const origin = event.headers?.origin || event.headers?.Origin || ""
  const corsHeaders = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  }
  if (
    ALLOWED_ORIGINS.includes(origin) ||
    ALLOWED_ORIGIN_PATTERNS.some((p) => p.test(origin))
  ) {
    corsHeaders["Access-Control-Allow-Origin"] = origin
  }

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" }
  }

  // Rate limiting
  const clientIp =
    event.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() ||
    context?.sourceIp ||
    "unknown"
  if (!checkRateLimit(clientIp)) {
    return {
      statusCode: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "请求过于频繁，请稍后再试" }),
    }
  }

  // Body size check
  const rawBody = event.body || ""
  if (typeof rawBody === "string" && rawBody.length > MAX_BODY_SIZE) {
    return {
      statusCode: 413,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "请求体过大" }),
    }
  }

  // Parse body
  let body
  try {
    if (event.body !== undefined) {
      body = typeof event.body === "string" ? JSON.parse(event.body) : event.body
    } else {
      body = typeof event === "string" ? JSON.parse(event) : event
    }
  } catch {
    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid request body" }),
    }
  }

  // Validate messages
  if (!body?.messages?.length) {
    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Missing messages" }),
    }
  }

  if (body.messages.length > MAX_MESSAGES) {
    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "消息数量超出限制" }),
    }
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
    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "消息内容过长" }),
    }
  }

  // Prompt injection guard
  if (hasInjectionAttempt(body.messages)) {
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
      body: `data: {"choices":[{"delta":{"content":"这个问题超出了我的能力范围，请问一些关于白子煜作品集相关的问题吧！"}}]}\n\ndata: [DONE]\n`,
    }
  }

  // Forward to MiMo API
  const upstreamBody = JSON.stringify({
    model: "mimo-v2.5",
    messages: body.messages,
    stream: true,
  })

  return new Promise((resolve) => {
    const upstreamReq = https.request(
      {
        hostname: MIMO_HOST,
        path: MIMO_PATH,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      },
      (upstreamRes) => {
        if (upstreamRes.statusCode !== 200) {
          let errorBody = ""
          upstreamRes.on("data", (chunk) => (errorBody += chunk))
          upstreamRes.on("end", () => {
            resolve({
              statusCode: upstreamRes.statusCode,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              body: JSON.stringify({
                error: `Upstream error (${upstreamRes.statusCode})`,
                detail: errorBody,
              }),
            })
          })
          return
        }

        let responseBody = ""
        upstreamRes.on("data", (chunk) => {
          responseBody += chunk.toString()
        })
        upstreamRes.on("end", () => {
          resolve({
            statusCode: 200,
            headers: {
              ...corsHeaders,
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
            body: responseBody,
          })
        })
      }
    )

    upstreamReq.on("error", (err) => {
      resolve({
        statusCode: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Proxy error", detail: err.message }),
      })
    })

    upstreamReq.write(upstreamBody)
    upstreamReq.end()
  })
}
