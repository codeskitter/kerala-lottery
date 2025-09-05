import { NextResponse } from "next/server"
import { queryAll, insertRecord } from "@/lib/database"

export async function GET() {
  try {
    const testimonials = await queryAll(`
      SELECT * FROM testimonials 
      WHERE is_active = TRUE
      ORDER BY display_order ASC
    `)
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const testimonialId = await insertRecord("testimonials", {
      name: body.name,
      location: body.location,
      avatar_url: body.avatar_url,
      testimonial: body.testimonial,
      prize_amount: body.prize_amount,
      win_date: body.win_date,
      rating: body.rating || 5,
      is_featured: body.is_featured || false,
      is_active: body.is_active !== false,
      display_order: body.display_order || 0,
    })

    const created = { id: testimonialId, ...body }
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error("Error creating testimonial:", error)
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
