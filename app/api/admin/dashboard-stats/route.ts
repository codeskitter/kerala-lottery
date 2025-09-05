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
      "SELECT COUNT(*) as count FROM user_registrations WHERE email IS NOT NULL OR mobile IS NOT NULL",
    )

    const siteSettings = await queryFirst<{ registration_amount: number }>(
      "SELECT registration_amount FROM site_settings ORDER BY id DESC LIMIT 1",
    )

    const verifiedCount = totalTickets?.count || 0
    const registrationAmount = siteSettings?.registration_amount || 447
    const totalPayments = verifiedCount * registrationAmount

    const stats = {
      totalTickets: totalTickets?.count || 0,
      registeredUsers: registeredUsers?.count || 0,
      contacts: totalContacts?.count || 0,
      totalPayments: Math.round(totalPayments), // Show actual payment total
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
