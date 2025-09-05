import { NextResponse } from "next/server"
import { contentStore } from "../../../_content-data"

export async function GET(_: Request, { params }: { params: { key: string } }) {
  const config = contentStore.getSiteConfig(params.key)
  if (!config) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(config)
}

export async function PUT(req: Request, { params }: { params: { key: string } }) {
  const patch = await req.json()
  const updated = contentStore.updateSiteConfig(params.key, patch)
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { key: string } }) {
  const ok = contentStore.deleteSiteConfig(params.key)
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ ok: true })
}
