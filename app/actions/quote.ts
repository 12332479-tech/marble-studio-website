"use server"

import { db } from "@/lib/db"
import { quoteRequests } from "@/lib/db/schema"

export type QuoteState = { status: "idle" | "success" | "error" | "invalid" }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const service = String(formData.get("service") ?? "").trim()
  const stone = String(formData.get("stone") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  // Server-side validation
  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return { status: "invalid" }
  }

  const fullMessage = stone ? `[Reference stone: ${stone}]\n${message}` : message

  try {
    await db.insert(quoteRequests).values({
      name: name.slice(0, 200),
      email: email.slice(0, 200),
      phone: phone ? phone.slice(0, 50) : null,
      service: service ? service.slice(0, 100) : null,
      message: fullMessage.slice(0, 5000),
    })
    return { status: "success" }
  } catch (error) {
    console.log("[v0] Failed to save quote request:", error)
    return { status: "error" }
  }
}
