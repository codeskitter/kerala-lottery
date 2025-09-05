import { NextResponse } from "next/server"
import { queryAll } from "@/lib/database"

export async function GET() {
  try {
    const monthlyData = await queryAll(`
      SELECT 
        DATE_FORMAT(claimed_at, '%b') as month,
        COALESCE(SUM(prize_amount), 0) / 10000000 as payout
      FROM winners 
      WHERE claimed_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        AND claim_status = 'claimed'
      GROUP BY YEAR(claimed_at), MONTH(claimed_at)
      ORDER BY YEAR(claimed_at), MONTH(claimed_at)
    `)

    // Fill in missing months with 0 payouts for better chart display
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currentMonth = new Date().getMonth()
    const last6Months = []

    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12
      const monthName = months[monthIndex]
      const found = monthlyData.find((item: any) => item.month === monthName)
      last6Months.push({
        month: monthName,
        payout: found ? Number.parseFloat(found.payout) : 0,
      })
    }

    return NextResponse.json({ monthlyData: last6Months })
  } catch (error) {
    console.error("Analytics payouts error:", error)
    return NextResponse.json({
      monthlyData: [
        { month: "Mar", payout: 0 },
        { month: "Apr", payout: 0 },
        { month: "May", payout: 0 },
        { month: "Jun", payout: 0 },
        { month: "Jul", payout: 0 },
        { month: "Aug", payout: 0 },
      ],
    })
  }
}
