"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { month: "Mar", payout: 2.1 },
  { month: "Apr", payout: 3.4 },
  { month: "May", payout: 2.8 },
  { month: "Jun", payout: 4.2 },
  { month: "Jul", payout: 3.9 },
  { month: "Aug", payout: 5.2 },
]

export function PayoutsBarChart() {
  return (
    <div className="rounded-lg border p-4 bg-card">
      <h2 className="font-heading text-lg font-semibold">Monthly Payouts (Cr)</h2>
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="payout" fill="var(--ink)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
