import { NextResponse } from "next/server"
import { queryFirst } from "@/lib/database"

export async function GET() {
  try {
    const siteSettings = await queryFirst(`
      SELECT * FROM site_settings 
      ORDER BY id DESC 
      LIMIT 1
    `)

    if (!siteSettings) {
      // Return default settings if none exist
      return NextResponse.json({
        site_name: "Kerala Jackpot Mega Lottery",
        contact_phone: "+91 96686 43802",
        contact_email: "info@keralajackpot.com",
        upi_id: "keralajackpot@upi",
        bank_name: "State Bank of India",
        account_name: "Kerala State Lotteries",
        account_number: "1234567890123456",
        ifsc_code: "SBIN0001234",
        payment_phone: "+91 99429 31164",
        registration_amount: 447,
      })
    }

    return NextResponse.json(siteSettings)
  } catch (error) {
    console.error("Error fetching site config:", error)
    return NextResponse.json({ error: "Failed to fetch site config" }, { status: 500 })
  }
}
