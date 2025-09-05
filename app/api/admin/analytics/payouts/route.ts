import { NextResponse } from "next/server"
import { query } from "../../_content-data"

export async function GET() {
  try {
    // Get monthly payout data for the last 6 months
    const monthlyData = await query(`
      SELECT 
        DATE_FORMAT(claimed_at, '%b') as month,
        SUM(prize_amount) / 10000000 as payout
      FROM winners 
      WHERE claimed_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        AND claim_status = 'claimed'
      GROUP BY YEAR(claimed_at), MONTH(claimed_at)
      ORDER BY YEAR(claimed_at), MONTH(claimed_at)
    `)

    return NextResponse.json({ monthlyData })
  } catch (error) {
    console.error("Analytics payouts error:", error)
    return NextResponse.json({ error: "Failed to fetch payout analytics" }, { status: 500 })
  }
}
