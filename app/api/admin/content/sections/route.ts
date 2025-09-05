import { NextResponse } from "next/server"
import { contentStore } from "../../_content-data"

export async function GET() {
  return NextResponse.json(contentStore.listContentSections())
}

export async function POST(req: Request) {
  const body = await req.json()
  const created = contentStore.addContentSection(body)
  return NextResponse.json(created, { status: 201 })
}
