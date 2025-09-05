import { NextResponse } from "next/server"
import { contentStore } from "../../_content-data"

export async function GET() {
  return NextResponse.json(contentStore.listSiteConfigs())
}

export async function POST(req: Request) {
  const body = await req.json()
  const created = contentStore.addSiteConfig(body)
  return NextResponse.json(created, { status: 201 })
}
