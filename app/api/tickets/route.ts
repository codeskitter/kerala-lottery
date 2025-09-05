import { NextResponse } from "next/server"
import { insertRecord, queryFirst, queryAll } from "@/lib/database"

type RegistrationData = {
  lottery: string
  ticketNumber: string
  name: string
  email: string
  phone: string
  paymentTxnId: string
  amount: string
  upiId: string
}

export async function POST(req: Request) {
  try {
    const data: RegistrationData = await req.json()

    if (!data.name || !data.phone || !data.email || !data.ticketNumber || !data.paymentTxnId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const existingTicket = await queryFirst("SELECT id FROM user_registrations WHERE ticket_number = ?", [
      data.ticketNumber,
    ])

    if (existingTicket) {
      return NextResponse.json({ error: "This ticket number is already registered" }, { status: 400 })
    }

    const registrationId = await insertRecord("user_registrations", {
      lottery_type: data.lottery,
      ticket_number: data.ticketNumber,
      name: data.name,
      email: data.email,
      mobile: data.phone,
      transaction_id: data.paymentTxnId,
      payment_status: "pending", // Will be verified by admin
      registration_date: new Date(),
      notes: `UPI Payment: ${data.amount} to ${data.upiId}`,
    })

    return NextResponse.json({
      ok: true,
      registrationId,
      message: "Registration submitted successfully. Payment will be verified within 24 hours.",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 })
  }
}

export async function GET() {
  try {
    const registrations = await queryAll(`
      SELECT 
        id,
        lottery_type,
        ticket_number,
        name,
        email,
        mobile,
        transaction_id,
        payment_status,
        registration_date,
        verified_at,
        notes
      FROM user_registrations 
      ORDER BY registration_date DESC
    `)

    return NextResponse.json(registrations || [])
  } catch (error) {
    console.error("Error fetching registrations:", error)
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
  }
}
