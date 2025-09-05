import { NextResponse } from "next/server"

export async function GET() {
  // Mock ticket data matching the design
  const tickets = [
    {
      id: "1",
      ticketNumber: "TKT001",
      price: 100,
      prizeWon: 0,
      status: "Active",
      createdDate: "2024-01-15",
    },
    {
      id: "2",
      ticketNumber: "TKT002",
      price: 250,
      prizeWon: 1000,
      status: "Won",
      createdDate: "2024-01-14",
    },
    {
      id: "3",
      ticketNumber: "TKT003",
      price: 150,
      prizeWon: 0,
      status: "Expired",
      createdDate: "2024-01-13",
    },
  ]

  return NextResponse.json(tickets)
}
