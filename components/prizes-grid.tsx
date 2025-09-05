"use client"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function PrizesGrid() {
  const { data: prizes } = useSWR("/api/admin/prizes", fetcher)

  const prizeArray = Array.isArray(prizes) ? prizes : []

  if (!prizeArray || prizeArray.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading prize information...</p>
      </div>
    )
  }

  const topPrizes = prizeArray.slice(0, 3)
  const lowerPrizes = prizeArray.slice(3)

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
          Prize <span className="text-brand">Structure</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Multiple chances to win with our comprehensive prize tiers.
        </p>
      </div>

      {/* Top 3 Prizes */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {topPrizes.map((prize: any) => (
          <div key={prize.id} className="card p-6 text-center">
            <h3 className="font-heading text-xl font-bold">{prize.tier}</h3>
            <div className="mt-2 text-3xl font-extrabold text-brand">₹{prize.amount}</div>
            <p className="mt-2 text-sm text-muted-foreground">
              {prize.description || `${prize.count} ${prize.count === 1 ? "Person" : "Persons"}`}
            </p>
          </div>
        ))}
      </div>

      {/* Lower Prizes Grid */}
      {lowerPrizes.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lowerPrizes.map((prize: any) => (
            <div key={prize.id} className="flex items-center justify-between rounded-lg border bg-card p-4">
              <div>
                <div className="font-semibold">{prize.tier}</div>
                <div className="text-sm text-muted-foreground">{prize.count} Persons</div>
              </div>
              <div className="font-bold text-brand">₹{prize.amount}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
