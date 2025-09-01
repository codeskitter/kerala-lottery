import { NextResponse } from "next/server"
import { store } from "../_data"

export async function GET() {
  return NextResponse.json(store.listPrizes())
}

export async function POST(req: Request) {
  const body = await req.json()
  const created = store.addPrize(body)
  return NextResponse.json(created, { status: 201 })
}
