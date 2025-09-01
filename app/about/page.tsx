export default function AboutPage() {
  return (
    <>
      <section className="w-full bg-gradient-to-b from-amber-50 to-transparent py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-heading text-4xl font-extrabold md:text-5xl">
            About <span className="text-brand">Mega Kerala Lottery</span>
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-muted">
            Kerala&apos;s premier lottery platform, offering life‑changing prizes with complete transparency and
            security.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mt-2 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-semibold">
              Our <span className="text-brand">Story</span>
            </h2>
            <p className="mt-4 text-muted">
              Mega Kerala Lottery is committed to empowering individuals and communities through responsible gaming
              practices, ensuring a positive impact on society while promoting entertainment and excitement. Our vision
              is to create a culture of hope and opportunity, where every player has an equal chance to win and make a
              difference in their lives.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/buy-ticket" className="btn btn-brand">
                Buy Ticket Now
              </a>
              <a href="/winners" className="btn border border-black/10 bg-white text-foreground hover:bg-black/5">
                View Winners
              </a>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="card p-6">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                {/* icon circle */}
                <span className="text-sm font-bold">👥</span>
              </div>
              <h3 className="font-heading text-lg font-semibold">10,000+</h3>
              <p className="mt-1 text-sm text-muted">Active participants across Kerala and beyond</p>
            </div>
            <div className="card p-6">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                <span className="text-sm font-bold">₹</span>
              </div>
              <h3 className="font-heading text-lg font-semibold">₹10 Lakh+</h3>
              <p className="mt-1 text-sm text-muted">Total prize money distributed annually</p>
            </div>
            <div className="card p-6 sm:col-span-2">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                <span className="text-sm font-bold">📅</span>
              </div>
              <h3 className="font-heading text-lg font-semibold">1+ Year</h3>
              <p className="mt-1 text-sm text-muted">Of trusted lottery operations in Kerala</p>
            </div>
          </div>
        </div>

        {/* How it Works section */}
        <section className="mt-16">
          <h2 className="text-center font-heading text-2xl font-semibold">
            How Kerala Lottery <span className="text-brand">Works</span>
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-muted">
            Understanding the process behind our transparent and secure lottery system.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Ticket Generation", "Lottery tickets are generated with unique numbers using a secure system."],
              ["Ticket Sales", "Tickets are sold through our online platform."],
              ["Draw Process", "Draws are conducted using certified random number generators."],
              ["Prize Distribution", "Winners are notified and prizes are distributed as per process."],
            ].map(([t, d]) => (
              <article key={t as string} className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                  <span className="text-sm font-bold">●</span>
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted">{d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Trust & Security trio */}
        <section className="mt-16">
          <h2 className="text-center font-heading text-2xl font-semibold">
            Trust &amp; <span className="text-brand">Security</span>
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-muted">
            Our commitment to maintaining the highest standards of integrity and security.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Secure Transactions", "All transactions are protected with advanced encryption and secure gateways."],
              ["Transparent Process", "Draws are conducted under strict supervision and independent audits."],
              ["Community Engagement", "We promote responsible gaming and support community initiatives."],
            ].map(([t, d]) => (
              <article key={t as string} className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                  <span className="text-sm font-bold">✓</span>
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted">{d}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
