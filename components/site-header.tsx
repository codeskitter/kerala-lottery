"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/buy-ticket", label: "Buy Ticket" },
  { href: "/results", label: "Check Results" },
  { href: "/winners", label: "Winners" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-extrabold tracking-wide text-brand">MEGA KERALA</span>
          <span className="rounded-md border px-2 py-1 text-[11px] font-semibold text-[#1f2937] bg-yellow-50 border-yellow-200">
            LOTTERY
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-1 text-sm md:flex">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={
                  "px-3 py-2 font-medium text-[#111827] transition hover:opacity-90 " + (active ? "nav-pill" : "")
                }
                aria-current={active ? "page" : undefined}
              >
                {l.label}
              </Link>
            )
          })}
          <button
            aria-label="Theme"
            className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full border text-[#111827]/80 hover:bg-gray-50"
            title="Theme"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-white/80 text-[#111827] hover:bg-white"
          >
            {open ? (
              // close icon
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              // hamburger
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t bg-white/95 backdrop-blur">
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 py-2">
            <ul className="flex flex-col">
              {links.map((l) => {
                const active = pathname === l.href
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={
                        "block w-full rounded-md px-3 py-2 text-[15px] font-medium text-[#111827] hover:bg-gray-50 " +
                        (active ? "nav-pill" : "")
                      }
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
