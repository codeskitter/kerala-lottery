import { NextResponse } from "next/server"
import { query } from "../_content-data"

export async function GET() {
  try {
    const winners = await query(`
      SELECT 
        w.*,
        d.draw_name,
        d.draw_date
      FROM winners w
      LEFT JOIN lottery_draws d ON w.draw_id = d.id
      WHERE w.is_published = TRUE
      ORDER BY w.prize_amount DESC, w.created_at DESC
      LIMIT 50
    `)

    return NextResponse.json({ winners })
  } catch (error) {
    console.error("Winners fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch winners" }, { status: 500 })
  }
}
