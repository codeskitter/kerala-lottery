"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useEffect, useState } from "react"

export function TicketsLineChart() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTicketData() {
      try {
        const response = await fetch("/api/admin/analytics/tickets")
        if (response.ok) {
          const result = await response.json()
          setData(result.weeklyData || [])
        } else {
          // Fallback data if API not available
          setData([
            { day: "Mon", tickets: 0 },
            { day: "Tue", tickets: 0 },
            { day: "Wed", tickets: 0 },
            { day: "Thu", tickets: 0 },
            { day: "Fri", tickets: 0 },
            { day: "Sat", tickets: 0 },
            { day: "Sun", tickets: 0 },
          ])
        }
      } catch (error) {
        console.error("Failed to fetch ticket data:", error)
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchTicketData()
  }, [])

  if (loading) {
    return (
      <div className="rounded-lg border p-4 bg-card">
        <h2 className="font-heading text-lg font-semibold">Tickets Sold (7 days)</h2>
        <div className="h-64 mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
        </div>
      </div>
    )
  }

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
