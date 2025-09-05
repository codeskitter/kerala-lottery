import { NextResponse } from "next/server"
import { queryAll } from "@/lib/database"

export async function GET() {
  try {
    const users = await queryAll(`
      SELECT 
        ur.id,
        ur.name,
        ur.email,
        ur.mobile as phone,
        ur.payment_status as status,
        ur.registration_date as registeredDate,
        COUNT(ur2.id) as ticketCount,
        GROUP_CONCAT(ur2.ticket_number SEPARATOR ', ') as tickets
      FROM user_registrations ur
      LEFT JOIN user_registrations ur2 ON ur.email = ur2.email
      GROUP BY ur.email, ur.name, ur.mobile, ur.payment_status, ur.registration_date
      ORDER BY ur.registration_date DESC
    `)

    const transformedUsers = users.map((user: any) => ({
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      tickets: user.tickets ? user.tickets.split(", ") : [],
      status: user.status === "verified" ? "Active" : "Inactive",
      registeredDate: new Date(user.registeredDate).toISOString().split("T")[0],
    }))

    return NextResponse.json(transformedUsers)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
