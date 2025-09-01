import { NextResponse } from "next/server"
const ADMIN_COOKIE = "admin_session"

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: ADMIN_COOKIE,
    value: "",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
  })
  return res
}
