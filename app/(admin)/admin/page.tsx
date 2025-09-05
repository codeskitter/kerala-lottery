"use client"

import useSWR from "swr"
import { Ticket, Users, MessageSquare, CreditCard } from "lucide-react"
import { TicketsLineChart } from "@/components/admin/charts/traffic-line"
import { PayoutsBarChart } from "@/components/admin/charts/payouts-bar"

type Stats = {
  totalTickets: number
  registeredUsers: number
  contacts: number
  totalPayments: number
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminDashboardPage() {
  const { data } = useSWR<Stats>("/api/admin/dashboard-stats", fetcher)

  const quickActions = [
    {
      title: "Create Ticket",
      description: "Add new ticket entry",
      icon: Ticket,
      href: "/admin/tickets?action=create",
    },
    {
      title: "Manage Users",
      description: "View user accounts",
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "Add Contact",
      description: "Create contact entry",
      icon: MessageSquare,
      href: "/admin/contacts?action=create",
    },
    {
      title: "Payment Setup",
      description: "Configure payments",
      icon: CreditCard,
      href: "/admin/payments",
    },
  ]

  return (
    <div className="flex-1 bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-purple-600 rounded"></div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome to your admin panel</p>
          </div>
        </div>
      </div>

      <main className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{data?.totalTickets?.toLocaleString() || "1,234"}</p>
                <p className="text-sm text-gray-500">Active tickets in system</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Ticket className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Registered Users</p>
                <p className="text-2xl font-bold text-gray-900">{data?.registeredUsers?.toLocaleString() || "856"}</p>
                <p className="text-sm text-gray-500">Total user accounts</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{data?.contacts?.toLocaleString() || "342"}</p>
                <p className="text-sm text-gray-500">Contact entries</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Payments</p>
                <p className="text-2xl font-bold text-gray-900">₹{data?.totalPayments?.toLocaleString() || "45,678"}</p>
                <p className="text-sm text-gray-500">Total payment amount</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TicketsLineChart />
          <PayoutsBarChart />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            <p className="text-gray-600">Frequently used management tasks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <a
                  key={action.title}
                  href={action.href}
                  className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </a>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
