import { NextResponse } from "next/server"
import { queryAll, insertRecord } from "@/lib/database"

export async function GET() {
  try {
    const faqs = await queryAll(`
      SELECT * FROM faqs 
      WHERE is_active = TRUE
      ORDER BY display_order ASC
    `)
    return NextResponse.json(faqs)
  } catch (error) {
    console.error("Error fetching FAQs:", error)
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const faqId = await insertRecord("faqs", {
      question: body.question,
      answer: body.answer,
      category: body.category || "general",
      display_order: body.display_order || 0,
      is_active: body.is_active !== false,
    })

    const created = { id: faqId, ...body }
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error("Error creating FAQ:", error)
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 })
  }
}
