import { NextResponse } from "next/server"
import { queryFirst } from "@/lib/database"

export async function POST(req: Request) {
  try {
    const { ticketNumber, mobile } = await req.json()

    if (!ticketNumber || !mobile) {
      return NextResponse.json({ error: "Ticket number and mobile number are required" }, { status: 400 })
    }

    const registration = await queryFirst(
      `
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
      WHERE ticket_number = ? AND mobile = ?
    `,
      [ticketNumber, mobile],
    )

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      registration: {
        ...registration,
        statusMessage: getStatusMessage(registration.payment_status),
      },
    })
  } catch (error) {
    console.error("Error checking registration status:", error)
    return NextResponse.json({ error: "Failed to check registration status" }, { status: 500 })
  }
}

function getStatusMessage(status: string): string {
  switch (status) {
    case "pending":
      return "Your registration is under review. Payment verification is in progress."
    case "verified":
      return "Congratulations! Your registration is verified and your ticket is active."
    case "rejected":
      return "Your registration was rejected. Please contact support for assistance."
    default:
      return "Status unknown. Please contact support."
  }
}
