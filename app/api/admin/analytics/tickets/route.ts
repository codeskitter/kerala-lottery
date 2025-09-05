import { NextResponse } from "next/server"
import { queryAll } from "@/lib/database"

export async function GET() {
  try {
    const weeklyData = await queryAll(`
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
    return NextResponse.json({
      weeklyData: [
        { day: "Mon", tickets: 0 },
        { day: "Tue", tickets: 0 },
        { day: "Wed", tickets: 0 },
        { day: "Thu", tickets: 0 },
        { day: "Fri", tickets: 0 },
        { day: "Sat", tickets: 0 },
        { day: "Sun", tickets: 0 },
      ],
    })
  }
}
