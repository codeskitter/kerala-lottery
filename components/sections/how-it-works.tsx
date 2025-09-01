const steps = [
  {
    title: "Select a Lottery",
    desc: "Choose from our variety of daily and weekly lottery options with different prize pools.",
  },
  { title: "Buy a Ticket", desc: "Purchase your ticket securely online with multiple payment options available." },
  { title: "Wait for the Draw", desc: "Draws are conducted daily at 6:00 PM and 7:00 PM under strict supervision." },
  { title: "Check Results & Win!", desc: "Results are announced immediately. Winners are notified via SMS and email." },
]

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h3 className="font-heading text-center text-3xl sm:text-4xl font-extrabold">
        How It <span className="text-brand">Works</span>
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
        Follow these simple steps to participate in our lottery and get a chance to win life-changing prizes.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.title} className="card p-6">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50 text-brand">
              {/* simple icon dot */}
              <svg width="18" height="18" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="6" fill="currentColor" />
              </svg>
            </div>
            <h4 className="font-heading text-lg font-semibold">{s.title}</h4>
            <p className="mt-2 text-sm text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
