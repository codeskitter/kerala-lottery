import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ADMIN_COOKIE = "admin_token"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminRoute = pathname.startsWith("/admin")
  const isAdminAPI = pathname.startsWith("/api/admin")
  const isLoginPage = pathname.startsWith("/admin/login")
  const isAuthAPI =
    pathname.startsWith("/api/admin/auth/") ||
    pathname.startsWith("/api/admin/login") ||
    pathname.startsWith("/api/admin/logout")

  // Allow auth endpoints and the login page through
  if (isLoginPage || isAuthAPI) return NextResponse.next()

  const session = request.cookies.get(ADMIN_COOKIE)?.value

  // if ((isAdminRoute || isAdminAPI) && !session) {
  //   // For API routes, return 401 instead of redirecting
  //   if (isAdminAPI) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  //   }
  //   const url = request.nextUrl.clone()
  //   url.pathname = "/admin/login"
  //   url.searchParams.set("next", pathname)
  //   return NextResponse.redirect(url)
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
