"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { day: "Mon", tickets: 3200 },
  { day: "Tue", tickets: 4100 },
  { day: "Wed", tickets: 3800 },
  { day: "Thu", tickets: 4600 },
  { day: "Fri", tickets: 5200 },
  { day: "Sat", tickets: 6900 },
  { day: "Sun", tickets: 4300 },
]

export function TicketsLineChart() {
  return (
    <div className="rounded-lg border p-4 bg-card">
      <h2 className="font-heading text-lg font-semibold">Tickets Sold (7 days)</h2>
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="tickets" stroke="var(--brand)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
