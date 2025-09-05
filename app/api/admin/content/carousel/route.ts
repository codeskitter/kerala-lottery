import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { queryAll, insertRecord, updateRecord, deleteRecord } from "@/lib/database"

export async function GET() {
  try {
    const images = await queryAll(`
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

    const { title, image_url, alt_text, link_url, display_order, is_active } = await request.json()

    const imageId = await insertRecord("carousel_images", {
      title,
      image_url,
      alt_text,
      link_url,
      display_order: display_order || 0,
      is_active: is_active !== false,
    })

    return NextResponse.json({ success: true, id: imageId })
  } catch (error) {
    console.error("Error creating carousel image:", error)
    return NextResponse.json({ error: "Failed to create carousel image" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token || !verifyAuth(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, title, image_url, alt_text, link_url, display_order, is_active } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 })
    }

    await updateRecord(
      "carousel_images",
      {
        title,
        image_url,
        alt_text,
        link_url,
        display_order,
        is_active,
      },
      "id = ?",
      [id],
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating carousel image:", error)
    return NextResponse.json({ error: "Failed to update carousel image" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token || !verifyAuth(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 })
    }

    await deleteRecord("carousel_images", "id = ?", [Number.parseInt(id)])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting carousel image:", error)
    return NextResponse.json({ error: "Failed to delete carousel image" }, { status: 500 })
  }
}
