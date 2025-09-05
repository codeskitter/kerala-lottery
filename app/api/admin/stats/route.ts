import { NextResponse } from "next/server"
import { queryFirst, queryAll } from "@/lib/database"

export async function GET() {
  try {
    const totalDraws = await queryFirst<{ count: number }>("SELECT COUNT(*) as count FROM lottery_draws")
    const totalWinners = await queryFirst<{ count: number }>("SELECT COUNT(*) as count FROM winners")
    const ticketsSold = await queryFirst<{ count: number }>(
      "SELECT COUNT(*) as count FROM user_registrations WHERE payment_status = 'verified' AND registration_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)",
    )
    const totalPayout = await queryFirst<{ total: number }>(
      "SELECT COALESCE(SUM(prize_amount), 0) / 10000000 as total FROM winners WHERE claim_status = 'claimed' AND MONTH(claimed_at) = MONTH(NOW())",
    )

    const recentResults = await queryAll(`
      SELECT 
        w.id,
        d.draw_code as drawId,
        w.ticket_number as winningNumber,
        w.created_at as publishedAt
      FROM winners w
      LEFT JOIN lottery_draws d ON w.draw_id = d.id
      WHERE w.is_published = TRUE
      ORDER BY w.created_at DESC
      LIMIT 5
    `)

    const upcomingDraws = await queryAll(`
      SELECT 
        id,
        draw_name as name,
        draw_date as date,
        status
      FROM lottery_draws 
      WHERE status = 'upcoming'
      ORDER BY draw_date ASC
      LIMIT 3
    `)

    return NextResponse.json({
      totalDraws: totalDraws?.count || 0,
      totalWinners: totalWinners?.count || 0,
      ticketsSold30d: ticketsSold?.count || 0,
      payoutThisMonthCr: totalPayout?.total || 0,
      recentResults,
      upcomingDraws,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
