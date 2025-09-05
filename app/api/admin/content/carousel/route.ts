import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { query } from "@/app/api/admin/_content-data"

export async function GET() {
  try {
    const images = await query(`
      SELECT * FROM carousel_images 
      ORDER BY display_order ASC, created_at DESC
    `)
    return NextResponse.json(images)
  } catch (error) {
    console.error("Error fetching carousel images:", error)
    return NextResponse.json({ error: "Failed to fetch carousel images" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token || !verifyAuth(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { image_url, alt_text, cta_text, cta_link, display_order, is_active } = await request.json()

    const result = await query(
      `
      INSERT INTO carousel_images (image_url, alt_text, cta_text, cta_link, display_order, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [image_url, alt_text, cta_text, cta_link, display_order || 0, is_active !== false],
    )

    return NextResponse.json({ success: true, id: result.insertId })
  } catch (error) {
    console.error("Error creating carousel image:", error)
    return NextResponse.json({ error: "Failed to create carousel image" }, { status: 500 })
  }
}
