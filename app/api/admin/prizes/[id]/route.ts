import { NextResponse } from "next/server"
import { store } from "../../_data"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const patch = await req.json()
  const updated = store.updatePrize(params.id, patch)
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const ok = store.deletePrize(params.id)
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ ok: true })
}
