"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

export function ShowWhenPublic({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")
  if (isAdmin) return null
  return <>{children}</>
}
