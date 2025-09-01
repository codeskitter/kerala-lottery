import { NextResponse } from "next/server"
import { store } from "../_data"

export async function GET() {
  return NextResponse.json(store.stats())
}
