import { NextResponse } from "next/server"
import { updateRecord, deleteRecord, queryFirst } from "@/lib/database"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const patch = await req.json()
    await updateRecord(
      "lottery_draws",
      {
        draw_name: patch.name,
        draw_date: patch.date,
        status: patch.status,
      },
      "id = ?",
      [params.id],
    )

    const updated = await queryFirst(
      `
      SELECT 
        id,
        draw_name as name,
        draw_date as date,
        status
      FROM lottery_draws 
      WHERE id = ?
    `,
      [params.id],
    )

    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating draw:", error)
    return NextResponse.json({ error: "Failed to update draw" }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await deleteRecord("lottery_draws", "id = ?", [params.id])
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error deleting draw:", error)
    return NextResponse.json({ error: "Failed to delete draw" }, { status: 500 })
  }
}
