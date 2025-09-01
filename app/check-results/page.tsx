export default function CheckResultsPage() {
  return (
    <>
      <section className="w-full bg-gradient-to-b from-amber-50 to-transparent py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-heading text-4xl font-extrabold md:text-5xl">
            Check Your <span className="text-brand">Results</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Enter your phone number and ticket number to check if you&apos;ve won.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Search card */}
        <div className="mx-auto mt-2 max-w-2xl rounded-xl border border-black/10 bg-white p-6 shadow-sm">
          <label className="block text-sm font-medium text-[#111827]">Search Anything</label>
          <input
            className="mt-2 h-12 w-full rounded-md border border-gray-200 bg-white px-3 text-[15px] outline-none focus:border-yellow-300 focus:ring-0"
            placeholder="Enter name, phone, or anything..."
          />
          <button className="btn btn-brand mt-4 w-full">Search</button>
        </div>

        {/* Methods grid */}
        <section className="mt-14">
          <h2 className="text-center font-heading text-2xl font-semibold">
            How to Check <span className="text-brand">Results</span>
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-muted">
            There are multiple ways to check if you&apos;ve won in our lottery draws.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Online Check",
                desc: "Use the form above to check your results by entering your phone number and ticket number.",
                icon: "🎟️",
              },
              {
                title: "SMS Notification",
                desc: "Winners are automatically notified via SMS on the registered phone number after each draw.",
                icon: "✅",
              },
              {
                title: "Official Website",
                desc: "Check the complete list of winning numbers published on our website after each draw.",
                icon: "🔎",
              },
            ].map((m) => (
              <article key={m.title} className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                  <span className="text-base">{m.icon}</span>
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm text-muted">{m.desc}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
