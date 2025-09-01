import Link from "next/link"

export function UpcomingDraw() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h3 className="font-heading text-center text-3xl sm:text-4xl font-extrabold">
        Upcoming <span className="text-brand">Draws</span>
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
        Don&apos;t miss your chance to participate in these upcoming lottery draws.
      </p>

      <div className="mx-auto mt-8 max-w-md">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Kerala State Mega Lottery</h4>
              <div className="mt-1 text-xs text-muted">2025-08-30</div>
            </div>
            <span className="rounded-full border border-yellow-300 bg-yellow-50 px-2 py-1 text-[10px] font-semibold text-[#1f2937]">
              Upcoming
            </span>
          </div>
          <p className="font-heading mt-4 text-center text-2xl font-extrabold text-brand">15:00</p>
          <div className="mt-5 flex justify-center">
            <Link href="/buy-ticket" className="btn btn-brand inline-flex items-center gap-2">
              Buy Ticket
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
