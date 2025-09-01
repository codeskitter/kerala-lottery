export function Testimonials() {
  const items = [
    {
      name: "Laxman shankar",
      meta: "Tamilnadu | Age: 52",
      quote:
        "This lottery win was a miracle! It allowed me to secure my family's future and live without financial worries.",
      avatar: "/images/avatar-1.png",
    },
    {
      name: "Rajshekhar Basu",
      meta: "Kolkata, West Bengal | Age: 29",
      quote: "I never believed in luck until I won the lottery. It's been a life-changing experience!",
      avatar: "/images/avatar-2.png",
    },
    {
      name: "Rajguru dhar",
      meta: "Jammu & Kashmir | Age: 37",
      quote: "Winning gave me the chance to retire early and travel the world with my family!",
      avatar: "/images/avatar-3.png",
    },
  ]
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-gray-50" />
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h3 className="font-heading text-center text-3xl sm:text-4xl font-extrabold">
          Winner <span className="text-brand">Testimonials</span>
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
          Discover the inspiring stories of our lucky winners whose lives were transformed by their lottery wins.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name} className="card p-6 text-center">
              <div className="mx-auto -mt-10 mb-2 size-16 overflow-hidden rounded-full ring-4 ring-white">
                <img
                  src={t.avatar || "/placeholder.svg"}
                  alt={`${t.name} avatar`}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="font-heading text-base font-semibold">{t.name}</figcaption>
              <div className="mt-1 text-xs text-muted">{t.meta}</div>
              <blockquote className="mt-3 text-sm italic text-[#4b5563]">“{t.quote}”</blockquote>
            </figure>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          <span className="h-2 w-2 rounded-full bg-gray-300" />
        </div>
      </div>
    </section>
  )
}
