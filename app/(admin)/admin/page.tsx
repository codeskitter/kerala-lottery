"use client"

import useSWR from "swr"
import { AdminTopbar } from "@/components/admin/topbar"
import { StatCard } from "@/components/admin/stat-card"
import { TicketsLineChart } from "@/components/admin/charts/traffic-line"
import { PayoutsBarChart } from "@/components/admin/charts/payouts-bar"

type Stats = {
  totalDraws: number
  totalWinners: number
  ticketsSold30d: number
  payoutThisMonthCr: number
  recentResults: { id: string; drawId: string; winningNumber: string; publishedAt: string }[]
  upcomingDraws: { id: string; name: string; date: string; status: string }[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminDashboardPage() {
  const { data } = useSWR<Stats>("/api/admin/stats", fetcher)

  return (
    <>
      <AdminTopbar title="Dashboard" />
      <main className="p-4 md:p-6 space-y-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Draws" value={data ? String(data.totalDraws) : "..."} hint="Across all series" />
          <StatCard
            label="Tickets Sold"
            value={data ? data.ticketsSold30d.toLocaleString() : "..."}
            hint="Last 30 days"
          />
          <StatCard label="Total Winners" value={data ? String(data.totalWinners) : "..."} hint="All-time" />
          <StatCard label="Payout (INR)" value={data ? `₹${data.payoutThisMonthCr}Cr` : "..."} hint="This month" />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-lg border p-4 bg-card">
            <h2 className="font-heading text-lg font-semibold">Recent Results</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Draw</th>
                    <th className="py-2 pr-4">Winning Number</th>
                    <th className="py-2 pr-4">Published</th>
                  </tr>
                </thead>
                <tbody className="[&_tr]:border-b">
                  {(data?.recentResults || []).map((r) => (
                    <tr key={r.id}>
                      <td className="py-2 pr-4">{r.drawId}</td>
                      <td className="py-2 pr-4 font-semibold">{r.winningNumber}</td>
                      <td className="py-2 pr-4">{new Date(r.publishedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!data?.recentResults?.length ? <div className="p-3 text-sm text-muted">No results yet.</div> : null}
            </div>
          </div>

          <div className="rounded-lg border p-4 bg-card">
            <h2 className="font-heading text-lg font-semibold">Upcoming Draw</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {(data?.upcomingDraws || []).map((d) => (
                <li key={d.id} className="flex items-center justify-between">
                  <span>
                    {d.name} {d.id}
                  </span>
                  <span className="nav-pill">{new Date(d.date).toLocaleDateString()}</span>
                </li>
              ))}
              {!data?.upcomingDraws?.length ? <li className="text-muted">No scheduled draws.</li> : null}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <TicketsLineChart />
          </div>
          <PayoutsBarChart />
        </section>
      </main>
    </>
  )
}
