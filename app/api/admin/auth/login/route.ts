import { NextResponse } from "next/server"

const ADMIN_COOKIE = "admin_session"
const DEFAULT_PASSWORD = "admin" // For development only. Set ADMIN_PASSWORD env var in production.

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}) as any)
  const password = String(body?.password || "")
  const valid = password && password === (process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD)

  // if (!valid) {
  //   return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 })
  // }

  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: ADMIN_COOKIE,
    value: "ok",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
    secure: process.env.NODE_ENV === "production",
  })
  return res
}
