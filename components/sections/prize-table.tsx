"use client"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function PrizeTable() {
  const { data: prizes } = useSWR("/api/admin/prizes", fetcher)

  return (
    <section aria-labelledby="prize-table-title" className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <h2 id="prize-table-title" className="font-heading text-3xl font-extrabold sm:text-4xl">
          Prize <span className="text-brand">Winner</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">Official prize tiers and number of winners per tier.</p>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border bg-card">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-secondary/60 text-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                Prize
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Amount (₹)
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                No. of Winners
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {prizes && prizes.length > 0 ? (
              prizes.map((prize: any) => (
                <tr key={prize.id}>
                  <td className="px-4 py-3">{prize.tier}</td>
                  <td className="px-4 py-3">{prize.amount}</td>
                  <td className="px-4 py-3">
                    {prize.count} {prize.count === 1 ? "person" : "persons"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                  Loading prize information...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
