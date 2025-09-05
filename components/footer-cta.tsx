import Link from "next/link"

export function FooterCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h3 className="font-heading text-3xl sm:text-4xl font-extrabold">
        Ready to <span className="text-brand">Change Your Life?</span>
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-muted">
        Don&apos;t miss your chance to win big with Mega Kerala Lottery. Buy your ticket now!
      </p>
      <div className="mt-6">
        <Link href="/buy-ticket" className="btn btn-brand inline-flex items-center gap-2">
          Buy Ticket Now
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
