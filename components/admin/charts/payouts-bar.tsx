"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useEffect, useState } from "react"

export function PayoutsBarChart() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPayoutData() {
      try {
        const response = await fetch("/api/admin/analytics/payouts")
        if (response.ok) {
          const result = await response.json()
          setData(result.monthlyData || [])
        } else {
          // Fallback data if API not available
          setData([
            { month: "Mar", payout: 0 },
            { month: "Apr", payout: 0 },
            { month: "May", payout: 0 },
            { month: "Jun", payout: 0 },
            { month: "Jul", payout: 0 },
            { month: "Aug", payout: 0 },
          ])
        }
      } catch (error) {
        console.error("Failed to fetch payout data:", error)
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchPayoutData()
  }, [])

  if (loading) {
    return (
      <div className="rounded-lg border p-4 bg-card">
        <h2 className="font-heading text-lg font-semibold">Monthly Payouts (Cr)</h2>
        <div className="h-64 mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
        </div>
      </div>
    )
  }

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
