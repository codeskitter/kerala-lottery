import { NextResponse } from "next/server"
import { queryFirst, updateRecord, queryAll } from "@/lib/database"

export async function GET() {
  try {
    const siteSettings = await queryFirst(`
      SELECT * FROM site_settings 
      ORDER BY id DESC 
      LIMIT 1
    `)

    const adminUsers = await queryAll(`
      SELECT id, username, email, role, is_active, last_login, created_at
      FROM admin_users
      ORDER BY created_at DESC
    `)

    return NextResponse.json({
      siteSettings: siteSettings || {
        site_name: "Kerala Jackpot Mega Lottery",
        contact_phone: "+91 96686 43802",
        contact_email: "info@keralajackpot.com",
        upi_id: "keralajackpot@upi",
        bank_name: "State Bank of India",
        account_name: "Kerala State Lotteries",
        account_number: "1234567890123456",
        ifsc_code: "SBIN0001234",
        payment_phone: "9942931164",
        registration_amount: 447.0,
      },
      adminUsers,
    })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { type, ...data } = body

    if (type === "site_settings") {
      // Check if settings exist
      const existing = await queryFirst("SELECT id FROM site_settings LIMIT 1")

      if (existing) {
        await updateRecord("site_settings", data, "id = ?", [existing.id])
      } else {
        // Insert new settings if none exist
        const { insertRecord } = await import("@/lib/database")
        await insertRecord("site_settings", data)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
