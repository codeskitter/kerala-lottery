import { Suspense } from "react"

async function getWinnersData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/admin/winners`, {
      cache: "no-store",
    })
    if (!response.ok) return { topWinners: [], allWinners: [] }

    const data = await response.json()
    return {
      topWinners: data.winners?.slice(0, 3) || [],
      allWinners: data.winners || [],
    }
  } catch (error) {
    console.error("Failed to fetch winners:", error)
    return { topWinners: [], allWinners: [] }
  }
}

async function WinnersContent() {
  const { topWinners, allWinners } = await getWinnersData()

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
            {topWinners.length > 0 ? (
              topWinners.map((winner: any) => (
                <article
                  key={winner.ticket_number}
                  className="rounded-xl border border-black/10 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                      <span className="text-sm font-semibold">🏆</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold">{winner.winner_name}</h3>
                      <p className="text-xs text-muted">Kerala</p>
                    </div>
                    <span className="ml-auto rounded-full bg-[#F4C430] px-2 py-0.5 text-xs font-semibold text-black">
                      ₹{winner.prize_amount?.toLocaleString()}
                    </span>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-muted">Lottery:</dt>
                      <dd>Kerala State Mega Lottery</dd>
                    </div>
                    <div>
                      <dt className="text-muted">Ticket:</dt>
                      <dd className="font-medium">{winner.ticket_number}</dd>
                    </div>
                  </dl>
                </article>
              ))
            ) : (
              <div className="col-span-3 text-center text-muted py-8">No winners data available yet.</div>
            )}
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
                {allWinners.length > 0 ? (
                  allWinners.map((winner: any, i: number) => (
                    <tr key={i} className="border-b border-black/5 last:border-0 [&>td]:px-4 [&>td]:py-3">
                      <td>
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5">
                            👤
                          </span>
                          <div>
                            <div className="font-medium">{winner.winner_name}</div>
                            <div className="text-xs text-muted">Kerala</div>
                          </div>
                        </div>
                      </td>
                      <td className="font-mono">{winner.ticket_number}</td>
                      <td>Kerala State Mega Lottery</td>
                      <td>{new Date(winner.created_at).toLocaleDateString()}</td>
                      <td className="text-brand">₹{winner.prize_amount?.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-muted">
                      No winners data available yet.
                    </td>
                  </tr>
                )}
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
            {topWinners.slice(0, 2).map((winner: any) => (
              <article key={winner.ticket_number} className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-black/5" aria-hidden />
                  <div className="flex-1">
                    <div className="font-semibold">{winner.winner_name}</div>
                    <div className="text-sm text-muted">Kerala</div>
                    <div className="text-xs text-amber-600">₹{winner.prize_amount?.toLocaleString()} Winner</div>
                  </div>
                </div>
                <div className="my-4 h-px bg-black/10" />
                <blockquote className="italic text-muted">
                  "Winning the Kerala State Mega Lottery has been a life-changing experience!"
                </blockquote>
                <div className="mt-4 text-xs text-muted">
                  Won on {new Date(winner.created_at).toLocaleDateString()} · Kerala State Mega Lottery
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default function WinnersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto"></div>
            <p className="mt-2 text-muted">Loading winners...</p>
          </div>
        </div>
      }
    >
      <WinnersContent />
    </Suspense>
  )
}
