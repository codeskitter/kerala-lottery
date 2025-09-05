import { NextResponse } from "next/server"
import { queryAll, insertRecord } from "@/lib/database"

export async function GET() {
  try {
    const draws = await queryAll(`
      SELECT 
        id,
        draw_name as name,
        draw_date as date,
        status
      FROM lottery_draws 
      ORDER BY draw_date DESC
    `)
    return NextResponse.json(draws)
  } catch (error) {
    console.error("Error fetching draws:", error)
    return NextResponse.json({ error: "Failed to fetch draws" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const drawId = await insertRecord("lottery_draws", {
      draw_name: body.name,
      draw_code: body.name?.slice(0, 2).toUpperCase() + "-" + Math.floor(500 + Math.random() * 600),
      draw_date: body.date,
      draw_time: "17:00:00",
      ticket_price: 447.0,
      total_tickets: 100000,
      status: body.status || "upcoming",
    })

    const created = {
      id: drawId,
      name: body.name,
      date: body.date,
      status: body.status || "upcoming",
    }

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error("Error creating draw:", error)
    return NextResponse.json({ error: "Failed to create draw" }, { status: 500 })
  }
}
