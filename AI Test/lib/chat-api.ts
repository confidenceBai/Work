import { buildSystemPrompt } from "./chat-context-builder"

const API_URL = "/api/chat"

const MAX_MESSAGE_LENGTH = 1000
const MAX_HISTORY_MESSAGES = 50
const REQUEST_TIMEOUT_MS = 30000

interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export async function* streamChat(
  userMessages: Array<{ role: "user" | "assistant"; content: string }>,
  contextRoute?: string
): AsyncGenerator<string> {
  // Trim history to max length
  const trimmedHistory = userMessages.slice(-MAX_HISTORY_MESSAGES)

  // Validate message lengths
  for (const msg of trimmedHistory) {
    if (msg.content.length > MAX_MESSAGE_LENGTH) {
      throw new Error(`消息过长（最多 ${MAX_MESSAGE_LENGTH} 字符）`)
    }
  }

  const messages: ChatMessage[] = [
    { role: "system", content: buildSystemPrompt(contextRoute || "/") },
    ...trimmedHistory,
  ]

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let response: Response
  try {
    response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mimo-v2.5",
        messages,
        stream: true,
      }),
      signal: controller.signal,
    })
  } catch (err) {
    clearTimeout(timeout)
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("请求超时，请稍后重试")
    }
    if (err instanceof TypeError && err.message === "Failed to fetch") {
      console.error("[chat-api] Failed to fetch:", API_URL, err)
      throw new Error("网络连接失败，请检查网络后重试")
    }
    console.error("[chat-api] Request error:", err)
    throw err
  }
  clearTimeout(timeout)

  if (!response.ok) {
    const errorText = await response.text().catch(() => "")
    throw new Error(`API 请求失败 (${response.status}): ${errorText || response.statusText}`)
  }

  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ""

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split("\n")
      buffer = lines.pop() || ""

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith("data:")) continue

        const data = trimmed.slice(5).trim()
        if (data === "[DONE]") return

        try {
          const parsed = JSON.parse(data)
          const delta = parsed.choices?.[0]?.delta?.content
          if (delta) {
            yield delta
          }
        } catch {
          // skip malformed JSON lines
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}
