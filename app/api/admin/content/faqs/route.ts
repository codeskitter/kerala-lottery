import { NextResponse } from "next/server"
import { contentStore } from "../../_content-data"

export async function GET() {
  return NextResponse.json(contentStore.listFAQs())
}

export async function POST(req: Request) {
  const body = await req.json()
  const created = contentStore.addFAQ(body)
  return NextResponse.json(created, { status: 201 })
}
