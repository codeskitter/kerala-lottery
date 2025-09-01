import Link from "next/link"

export function Hero() {
  return (
    <section className="bg-brand-gradient text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="text-center">
          <h1 className="font-heading text-pretty text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            <span className="text-brand-gradient">WIN BIG</span> WITH KERALA&apos;S
            <br />
            PREMIER LOTTERY
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base text-white/90 sm:text-lg">
            Try your luck today for a chance to win up to
          </p>
          <p className="font-heading mt-2 text-3xl font-extrabold text-brand-gradient sm:text-4xl">₹25 CRORE</p>
          <div className="mt-7 flex justify-center">
            <Link href="/buy-ticket" className="btn btn-brand inline-flex items-center gap-2">
              Buy Ticket Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
