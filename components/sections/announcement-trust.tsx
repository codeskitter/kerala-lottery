import Link from "next/link"

export function AnnouncementTrust() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-yellow-50 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-14 text-center">
        <h2 className="font-heading text-4xl sm:text-5xl font-extrabold">
          <span className="text-brand">Results</span> Will Be Out at <span className="text-brand">3 PM!</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted">Stay tuned for the big reveal of our Mega Prize winners!</p>
        <div className="mt-6">
          <Link
            href="/results"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)] px-5 py-2 text-sm font-semibold text-[#111827]"
          >
            Happening Today!
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-14">
        <h3 className="font-heading text-center text-3xl sm:text-4xl font-extrabold">
          Trust & <span className="text-brand">Security</span>
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
          Our commitment to maintaining the highest standards of integrity and security.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Secure Transactions", d: "Protected with advanced encryption and secure payment gateways." },
            { t: "Transparent Process", d: "Draws under strict supervision with certified RNG and audits." },
            { t: "Community Engagement", d: "Promoting responsible gaming and community initiatives." },
          ].map((b) => (
            <div key={b.t} className="card p-6">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-50 text-brand">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" fill="currentColor" />
                </svg>
              </div>
              <h4 className="font-heading text-base font-semibold">{b.t}</h4>
              <p className="mt-1 text-sm text-muted">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
