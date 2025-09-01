import Link from "next/link"

export function ResultsCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center">
        <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#0b0f19]">
          Check <span className="text-accent">• Live</span> Results Now!
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted">Watch the winners being announced in real-time!</p>
        <div className="mt-7">
          <Link href="/results" className="btn btn-accent inline-flex items-center gap-2">
            Check Live Results
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
