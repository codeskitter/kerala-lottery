import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const authResult = await AuthService.login(username, password)

    if (!authResult) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const response = NextResponse.json({
      success: true,
      user: authResult.user,
    })

    // Set HTTP-only cookie with JWT token
    response.cookies.set("admin_token", authResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
