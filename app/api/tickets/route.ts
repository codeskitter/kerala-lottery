import { NextResponse } from "next/server"

type Ticket = { name: string; phone: string; email: string; ticketNumber: string }
const store: Ticket[] = []

export async function POST(req: Request) {
  const { name, phone, email, ticketNumber } = await req.json()
  if (!name || !phone || !email || !ticketNumber) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }
  store.push({ name, phone, email, ticketNumber })
  return NextResponse.json({ ok: true })
}
