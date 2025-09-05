import { NextResponse } from "next/server"
import { queryFirst } from "@/lib/database"

export async function GET() {
  try {
    const totalTickets = await queryFirst<{ count: number }>(
      "SELECT COUNT(*) as count FROM user_registrations WHERE payment_status = 'verified'",
    )

    const registeredUsers = await queryFirst<{ count: number }>(
      "SELECT COUNT(DISTINCT email) as count FROM user_registrations",
    )

    const totalContacts = await queryFirst<{ count: number }>(
      "SELECT COUNT(*) as count FROM user_registrations WHERE contact_email IS NOT NULL OR mobile IS NOT NULL",
    )

    const totalPayments = await queryFirst<{ total: number }>(
      `SELECT COALESCE(SUM(registration_amount), 0) as total 
       FROM user_registrations 
       WHERE payment_status = 'verified'`,
    )

    const stats = {
      totalTickets: totalTickets?.count || 0,
      registeredUsers: registeredUsers?.count || 0,
      contacts: totalContacts?.count || 0,
      totalPayments: Math.round((totalPayments?.total || 0) / 1000), // Convert to thousands for display
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    // Return fallback data if database query fails
    return NextResponse.json({
      totalTickets: 0,
      registeredUsers: 0,
      contacts: 0,
      totalPayments: 0,
    })
  }
}
