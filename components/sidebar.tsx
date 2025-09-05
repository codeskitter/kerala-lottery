"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/draws", label: "Draws" },
  { href: "/admin/results", label: "Results & Winners" },
  { href: "/admin/prizes", label: "Prizes" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/settings", label: "Settings" },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const currentPathname = typeof window !== "undefined" ? window.location.pathname : pathname
  return (
    <aside
      className="hidden md:flex md:w-64 shrink-0 flex-col border-r bg-[var(--sidebar)]"
      aria-label="Admin navigation"
    >
      <div className="h-14 flex items-center px-4 border-b">
        <span className="font-heading font-semibold text-lg text-foreground">Admin</span>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {links.map((l) => {
            const active = currentPathname === l.href || currentPathname?.startsWith(l.href + "/")
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition ${
                    active
                      ? "bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]"
                      : "text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]/60"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="mt-auto p-3">
        <div className="text-xs text-muted">v1.0</div>
      </div>
    </aside>
  )
}
