export default function WinnersPage() {
  const top = [
    {
      name: "Shyamal Giri",
      region: "West Bengal",
      ticket: "KL 865342",
      prize: "12,00,000",
    },
    {
      name: "Shaik Ejaz",
      region: "West Bengal",
      ticket: "KL332233",
      prize: "12,00,000",
    },
    {
      name: "Brijmohan Sharma",
      region: "Himachal Pradesh",
      ticket: "KL700007",
      prize: "12 Lakh",
    },
  ]

  const all = [
    ["Shyamal Giri", "KL 865342", "Kerala State Mega Lottery", "30/08/2025", "1200000"],
    ["Shaik Ejaz", "KL332233", "Kerala State Mega Lottery", "30/08/2025", "1200000"],
    ["Brijmohan Sharma", "KL700007", "Kerala State Mega Lottery", "30/08/2025", "12 Lakh"],
    ["Ananta Nayak", "KL996632", "Kerala State Mega Lottery", "30/08/2025", "2500000"],
    ["Ramu", "KL745678", "Kerala State Mega Lottery", "30/08/2025", "1200000"],
    ["Manu T", "KL996642", "Kerala State Mega Lottery", "30/08/2025", "1200000"],
    ["Raghavendra Guttedar", "KL101101", "Kerala State Mega Lottery", "30/08/2025", "1200000"],
    ["Kamasamala senu chari", "KL__420", "Kerala State Mega Lottery", "30/08/2025", "1200000"],
    ["Touseef Ahmad khan", "KL384699", "Kerala State Mega Lottery", "30/08/2025", "1200000"],
    ["Rajesh vk", "KL952368", "Kerala State Mega Lottery", "30/08/2025", "1200000"],
  ]

  return (
    <>
      <section className="w-full bg-gradient-to-b from-amber-50 to-transparent py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-heading text-4xl font-extrabold md:text-5xl">
            Our <span className="text-brand">Winners</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Meet the lucky individuals whose lives have been transformed by Mega Kerala Lottery.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Top Winners */}
        <section className="mt-14">
          <h2 className="text-center font-heading text-2xl font-semibold">
            Top <span className="text-brand">Winners</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted">
            Celebrating our biggest jackpot winners from recent draws.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {top.map((w) => (
              <article key={w.ticket} className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                    <span className="text-sm font-semibold">🏆</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold">{w.name}</h3>
                    <p className="text-xs text-muted">{w.region}</p>
                  </div>
                  <span className="ml-auto rounded-full bg-[#F4C430] px-2 py-0.5 text-xs font-semibold text-black">
                    {w.prize}
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-muted">Lottery:</dt>
                    <dd>Kerala State Mega Lottery</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Ticket:</dt>
                    <dd className="font-medium">{w.ticket}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        {/* All Winners Table */}
        <section className="mt-16">
          <h2 className="text-center font-heading text-2xl font-semibold">
            All <span className="text-brand">Winners</span>
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-muted">
            Browse through our complete list of winners from various lottery draws.
          </p>

          <div className="mt-8 overflow-x-auto rounded-xl border border-black/10 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-black/10 text-muted">
                <tr className="[&>th]:px-4 [&>th]:py-3">
                  <th>Winner</th>
                  <th>Ticket Number</th>
                  <th>Lottery</th>
                  <th>Draw Date</th>
                  <th>Prize</th>
                </tr>
              </thead>
              <tbody>
                {all.map((r, i) => (
                  <tr key={i} className="border-b border-black/5 last:border-0 [&>td]:px-4 [&>td]:py-3">
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5">
                          👤
                        </span>
                        <div>
                          <div className="font-medium">{r[0]}</div>
                          <div className="text-xs text-muted">Kerala</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono">{r[1]}</td>
                    <td>{r[2]}</td>
                    <td>{r[3]}</td>
                    <td className="text-brand">{r[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-center font-heading text-2xl font-semibold">
            Winner <span className="text-brand">Stories</span>
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-muted">
            Hear how winning the lottery has transformed the lives of our winners.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              {
                name: "Shyamal Giri",
                region: "West Bengal",
                tag: "1200000 Winner",
                quote: "Winning the Kerala State Mega Lottery lottery has been a life-changing experience!",
                meta: "Won on 30/08/2025 · Kerala State Mega Lottery",
              },
              {
                name: "Shaik Ejaz",
                region: "West Bengal",
                tag: "1200000 Winner",
                quote: "Winning the Kerala State Mega Lottery lottery has been a life-changing experience!",
                meta: "Won on 30/08/2025 · Kerala State Mega Lottery",
              },
            ].map((s) => (
              <article key={s.name} className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-black/5" aria-hidden />
                  <div className="flex-1">
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-sm text-muted">{s.region}</div>
                    <div className="text-xs text-amber-600">{s.tag}</div>
                  </div>
                </div>
                <div className="my-4 h-px bg-black/10" />
                <blockquote className="italic text-muted">“{s.quote}”</blockquote>
                <div className="mt-4 text-xs text-muted">{s.meta}</div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
