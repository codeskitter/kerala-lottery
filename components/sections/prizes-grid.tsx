const prizes = [
  {
    tier: "1st Prize",
    amount: "₹25 Cr",
    desc: "The life-changing grand prize that can make all your dreams come true. (1 Person)",
  },
  {
    tier: "2nd Prize",
    amount: "₹10 Cr",
    desc: "A substantial prize that can transform your financial future. (1 Person)",
  },
  { tier: "3rd Prize", amount: "₹3 Cr", desc: "A significant prize that can help you achieve your goals. (1 Person)" },
]
const lower = [
  { tier: "4th Prize", amount: "₹25 Lakh", people: "12 Persons" },
  { tier: "5th Prize", amount: "₹12 Lakh", people: "16 Persons" },
  { tier: "6th Prize", amount: "₹1,50,000", people: "36 Persons" },
  { tier: "7th Prize", amount: "₹1,25,000", people: "99 Persons" },
  { tier: "8th Prize", amount: "₹1,00,000", people: "120 Persons" },
  { tier: "9th Prize", amount: "₹75,000", people: "179 Persons" },
  { tier: "10th Prize", amount: "₹50,000", people: "200 Persons" },
  { tier: "11th Prize", amount: "₹40,000", people: "220 Persons" },
  { tier: "12th Prize", amount: "₹30,000", people: "250 Persons" },
  { tier: "13th Prize", amount: "₹20,000", people: "270 Persons" },
  { tier: "14th Prize", amount: "₹10,000", people: "285 Persons" },
  { tier: "15th Prize", amount: "₹5,000", people: "300 Persons" },
]

export function PrizesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h3 className="font-heading text-center text-3xl sm:text-4xl font-extrabold">
        Mega <span className="text-brand">Prizes</span>
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
        Our lottery offers some of the biggest prize pools in India, with multiple chances to win.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {prizes.map((p) => (
          <div key={p.tier} className="card p-6">
            <div className="label">{p.tier}</div>
            <div className="mt-1 font-heading text-3xl font-extrabold text-brand">{p.amount}</div>
            <p className="mt-4 text-sm text-muted">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {lower.map((p) => (
          <div key={p.tier} className="card p-6">
            <div className="label">{p.tier} 🏆</div>
            <div className="mt-1 font-heading text-2xl font-extrabold">{p.amount}</div>
            <p className="mt-2 text-xs text-muted">{p.people}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
