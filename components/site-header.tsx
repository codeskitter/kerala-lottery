"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const links = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT US" },
  { href: "/buy-ticket", label: "REGISTER" }, // mapped to buy-ticket page
  { href: "/winners", label: "WINNER LIST" },
  { href: "/results", label: "CHECK YOUR LOTTERY" },
  { href: "/contact", label: "CONTACT" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Slim top info bar */}
      <div className="hidden border-b border-black/10 bg-[#f9fafb] text-[12px] text-[#111827] md:block">
        
      </div>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          {/* Slightly bolder brand styling */}
          <span className="font-heading text-xl font-extrabold tracking-wide text-brand">KERALA STATE</span>
          <span className="rounded-md border px-2 py-1 text-[11px] font-semibold text-[#1f2937] bg-yellow-50 border-yellow-200">
            LOTTERIES
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-0 md:flex">
          {links.map((l, idx) => {
            const active = pathname === l.href
            return (
              <div key={l.href} className="flex items-center">
                <Link
                  href={l.href}
                  className={
                    // Uppercase, tighter spacing, subtle active pill like reference
                    "px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#111827] hover:text-brand " +
                    (active ? "nav-pill" : "")
                  }
                  aria-current={active ? "page" : undefined}
                >
                  {l.label}
                </Link>
                {idx < links.length - 1 && <span className="mx-0.5 text-black/20">|</span>}
              </div>
            )
          })}
          {/* Quick CTA */}
          <a
            href="/results"
            className="ml-3 inline-flex h-9 items-center rounded-full bg-brand px-3 text-xs font-semibold text-white"
          >
            Check Result
          </a>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="tel:+918981761109"
            aria-label="Call support"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white/80 text-[#111827] hover:bg-white"
            title="Call"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 11 19.5a19.5 19.5 0 0 1-7.5-7.5A19.86 19.86 0 0 1 2.09 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.6 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.12a2 2 0 0 1 2.11-.45c.84.28 1.71.48 2.61.6A2 2 0 0 1 22 16.92Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-white/80 text-[#111827] hover:bg-white"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
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
          {/* Add quick result link in mobile also */}
          <div className="mx-auto max-w-6xl px-4 py-2">
            <a
              href="/results"
              className="mb-2 inline-flex w-full items-center justify-center rounded-full bg-brand px-3 py-2 text-xs font-semibold text-white"
            >
              Check Result
            </a>
          </div>
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 pb-2">
            <ul className="flex flex-col">
              {links.map((l) => {
                const active = pathname === l.href
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={
                        "block w-full rounded-md px-3 py-2 text-[13px] font-semibold uppercase tracking-wide text-[#111827] hover:bg-gray-50 " +
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
