import { NextResponse } from "next/server"
import { queryFirst, updateRecord } from "@/lib/database"

export async function POST(req: Request) {
  try {
    const { registrationId, ticketNumber } = await req.json()

    if (!registrationId || !ticketNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if ticket number is already allocated
    const existingTicket = await queryFirst(
      "SELECT id FROM user_registrations WHERE ticket_number = ? AND id != ? AND payment_status = 'verified'",
      [ticketNumber, registrationId],
    )

    if (existingTicket) {
      return NextResponse.json({ error: "Ticket number already allocated" }, { status: 400 })
    }

    // Update the registration with new ticket number
    await updateRecord(
      "user_registrations",
      {
        ticket_number: ticketNumber,
        payment_status: "verified",
        verified_at: new Date(),
      },
      "id = ?",
      [registrationId],
    )

    return NextResponse.json({ success: true, message: "Ticket allocated successfully" })
  } catch (error) {
    console.error("Error allocating ticket:", error)
    return NextResponse.json({ error: "Failed to allocate ticket" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Get next available ticket number
    const lastTicket = await queryFirst(
      "SELECT ticket_number FROM user_registrations WHERE payment_status = 'verified' ORDER BY CAST(SUBSTRING(ticket_number, 3) AS UNSIGNED) DESC LIMIT 1",
    )

    let nextNumber = 1
    if (lastTicket && lastTicket.ticket_number) {
      const lastNumber = Number.parseInt(lastTicket.ticket_number.substring(2))
      nextNumber = lastNumber + 1
    }

    const nextTicketNumber = `KL${nextNumber.toString().padStart(6, "0")}`

    return NextResponse.json({ nextTicketNumber })
  } catch (error) {
    console.error("Error getting next ticket number:", error)
    return NextResponse.json({ error: "Failed to get next ticket number" }, { status: 500 })
  }
}
