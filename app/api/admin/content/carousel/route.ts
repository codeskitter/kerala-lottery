import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { queryAll, insertRecord } from "@/lib/database"

export async function GET() {
  try {
    const images = await queryAll(`
      SELECT * FROM carousel_images 
      WHERE is_active = TRUE
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

    const imageId = await insertRecord("carousel_images", {
      image_url,
      alt_text,
      cta_text,
      cta_link,
      display_order: display_order || 0,
      is_active: is_active !== false,
    })

    return NextResponse.json({ success: true, id: imageId })
  } catch (error) {
    console.error("Error creating carousel image:", error)
    return NextResponse.json({ error: "Failed to create carousel image" }, { status: 500 })
  }
}
