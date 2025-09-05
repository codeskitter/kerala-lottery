"use client"

import { useState } from "react"

export function AdminTopbar({ title }: { title: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="h-14 sticky top-0 z-20 border-b bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border hover:bg-accent"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="i-lucide-menu text-foreground" aria-hidden />
          </button>
          <h1 className="font-heading text-base font-semibold text-balance">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Placeholder for future actions: user menu, theme toggle, etc. */}
          <button className="btn btn-brand h-9">Save</button>
        </div>
      </div>

      {/* Mobile drawer mock (simple) */}
      {menuOpen ? (
        <div className="md:hidden border-t">
          <nav className="p-2 space-y-1">
            {[
              { href: "/admin", label: "Dashboard" },
              { href: "/admin/draws", label: "Draws" },
              { href: "/admin/results", label: "Results & Winners" },
              { href: "/admin/prizes", label: "Prizes" },
              { href: "/admin/settings", label: "Settings" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
