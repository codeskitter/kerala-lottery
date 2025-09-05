import { NextResponse } from "next/server"
import { queryAll, insertRecord } from "@/lib/database"

export async function GET() {
  try {
    const prizes = await queryAll(`
      SELECT 
        id,
        prize_name as tier,
        prize_amount as amount,
        winner_count as count
      FROM prize_structure 
      ORDER BY prize_rank ASC
    `)
    return NextResponse.json(prizes)
  } catch (error) {
    console.error("Error fetching prizes:", error)
    return NextResponse.json({ error: "Failed to fetch prizes" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const prizeId = await insertRecord("prize_structure", {
      draw_id: 1, // Default draw ID, should be configurable
      prize_rank: 1,
      prize_name: body.tier,
      prize_amount: Number.parseFloat(body.amount.replace(/,/g, "")),
      winner_count: body.count,
    })

    const created = {
      id: prizeId,
      tier: body.tier,
      amount: body.amount,
      count: body.count,
    }

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error("Error creating prize:", error)
    return NextResponse.json({ error: "Failed to create prize" }, { status: 500 })
  }
}
