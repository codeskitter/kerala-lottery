"use client"

import Link from "next/link"

export function ResultsCTA() {
  return (
    <section className="relative bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14 text-center">
        <h2 className="text-balance text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          Check Your Lottery Result
        </h2>
        <p className="text-muted-foreground mb-6">See live results instantly and verify your ticket securely.</p>
        <div className="flex items-center justify-center">
          <Link
            href="/results"
            className="group relative inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transform-gpu will-change-transform animate-scale-pulse"
            aria-label="Check your lottery result live"
          >
            {/* multicolor animated background */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full animate-gradient-shift bg-[linear-gradient(90deg,#065f46,#059669,#10b981,#34d399,#22c55e,#065f46)] bg-[length:300%_100%]"
            />
            {/* neon glow ring */}
            <span aria-hidden="true" className="absolute inset-0 rounded-full neon-glow" />
            {/* label with bulb-like blink */}
            <span className="relative z-10 animate-bulb-blink">Check Your Lottery Result Live</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
