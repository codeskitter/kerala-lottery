import { NextResponse } from "next/server"
import { queryAll, updateRecord } from "@/lib/database"

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

    return NextResponse.json(registrations)
  } catch (error) {
    console.error("Error fetching registrations:", error)
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { id, payment_status, notes, admin_id } = await req.json()

    if (!id || !payment_status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const updateData: any = {
      payment_status,
      notes: notes || null,
    }

    if (payment_status === "verified") {
      updateData.verified_at = new Date()
      updateData.verified_by = admin_id || 1 // Default admin ID
    }

    await updateRecord("user_registrations", updateData, "id = ?", [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating registration:", error)
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 })
  }
}
