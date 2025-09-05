import { NextResponse } from "next/server"
import { query } from "../../_content-data"

export async function GET() {
  try {
    // Get ticket sales data for the last 7 days
    const weeklyData = await query(`
      SELECT 
        DAYNAME(registration_date) as day,
        COUNT(*) as tickets
      FROM user_registrations 
      WHERE registration_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        AND payment_status = 'verified'
      GROUP BY DAYOFWEEK(registration_date), DAYNAME(registration_date)
      ORDER BY DAYOFWEEK(registration_date)
    `)

    // Fill in missing days with 0 tickets
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const formattedData = daysOfWeek.map((day) => {
      const found = weeklyData.find((item: any) => item.day === day)
      return {
        day: day.substring(0, 3), // Mon, Tue, etc.
        tickets: found ? Number.parseInt(found.tickets) : 0,
      }
    })

    return NextResponse.json({ weeklyData: formattedData })
  } catch (error) {
    console.error("Analytics tickets error:", error)
    return NextResponse.json({ error: "Failed to fetch ticket analytics" }, { status: 500 })
  }
}
