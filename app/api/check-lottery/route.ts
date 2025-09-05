import { NextResponse } from "next/server"

const DRAW_LABEL = "AUGUST 2025 DAILY LOTTERY DRAW"

export async function POST(req: Request) {
  const { phone, ticketNumber } = await req.json()
  if (!phone && !ticketNumber) {
    return NextResponse.json({ status: "pending", message: "Provide phone or ticket number." }, { status: 400 })
  }

  // Normalize reference and compute a simple, deterministic result for demo purposes
  const ref = String(ticketNumber || phone || "")
  const digits = ref.replace(/\D+/g, "")
  const last = digits.slice(-1)
  const n = Number(last || "0")

  let status: "pending" | "won" | "not-winner"
  if (Number.isNaN(n)) status = "pending"
  else if (n === 7) status = "won"
  else status = n % 2 === 0 ? "pending" : "not-winner"

  const base = {
    status,
    draw: DRAW_LABEL,
  } as { status: string; message?: string; tier?: string; prize?: string; draw?: string }

  if (status === "won") {
    // Map some pseudo tiers by last two digits just for demo UX
    const lastTwo = Number(digits.slice(-2) || "0")
    const tier =
      lastTwo % 5 === 0
        ? "1st Prize"
        : lastTwo % 4 === 0
          ? "2nd Prize"
          : lastTwo % 3 === 0
            ? "3rd Prize"
            : "Consolation"
    const prize =
      tier === "1st Prize"
        ? "₹12 Crore"
        : tier === "2nd Prize"
          ? "₹50 Lakh"
          : tier === "3rd Prize"
            ? "₹12 Lakh"
            : "₹1 Lakh"
    return NextResponse.json({
      ...base,
      message: "Congratulations! Your ticket appears in the winning list. Please verify with official results.",
      tier,
      prize,
    })
  }

  const message =
    status === "pending"
      ? "Results are being processed. Check back later or verify with the official draw."
      : "No prize found for this reference. Please verify your ticket details and draw date."
  return NextResponse.json({ ...base, message })
}
