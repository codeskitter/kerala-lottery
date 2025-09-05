import { NextResponse } from "next/server"
import { queryAll, insertRecord } from "@/lib/database"

export async function GET() {
  try {
    const sections = await queryAll(`
      SELECT * FROM content_sections 
      WHERE is_active = TRUE
      ORDER BY display_order ASC
    `)
    return NextResponse.json(sections)
  } catch (error) {
    console.error("Error fetching content sections:", error)
    return NextResponse.json({ error: "Failed to fetch content sections" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const sectionId = await insertRecord("content_sections", {
      section_key: body.section_key,
      section_name: body.section_name,
      title: body.title,
      subtitle: body.subtitle,
      content: body.content,
      image_url: body.image_url,
      button_text: body.button_text,
      button_url: body.button_url,
      display_order: body.display_order || 0,
      is_active: body.is_active !== false,
    })

    const created = { id: sectionId, ...body }
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error("Error creating content section:", error)
    return NextResponse.json({ error: "Failed to create content section" }, { status: 500 })
  }
}
