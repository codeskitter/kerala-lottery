const benefits = [
  { title: "100% Secure & Trusted", desc: "Fully licensed and regulated with complete security and transparency." },
  { title: "Instant Result Updates", desc: "Immediate notifications about draw results via SMS and email." },
  { title: "Multiple Prizes to Win", desc: "Higher chances with multiple prize tiers in each draw." },
  { title: "Easy Payment & Booking", desc: "UPI, cards, and net banking supported with a user-friendly flow." },
]

export function WhyChoose() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h3 className="font-heading text-center text-3xl sm:text-4xl font-extrabold">
        Why Choose <span className="text-brand">Us?</span>
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
        We offer a premium lottery experience with multiple benefits.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {benefits.map((b) => (
          <div key={b.title} className="card p-6">
            <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-50 text-brand">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <h4 className="font-heading text-base font-semibold">{b.title}</h4>
            <p className="mt-1 text-sm text-muted">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
