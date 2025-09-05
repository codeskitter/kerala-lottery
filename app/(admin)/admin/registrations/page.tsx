"use client"

import { useState } from "react"
import useSWR from "swr"
import { Users, Search, Eye, CheckCircle, XCircle, Clock, Ticket } from "lucide-react"

type Registration = {
  id: number
  lottery_type: string
  ticket_number: string
  name: string
  email: string
  mobile: string
  transaction_id: string
  payment_status: "pending" | "verified" | "rejected"
  registration_date: string
  verified_at?: string
  notes?: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function RegistrationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)
  const [newTicketNumber, setNewTicketNumber] = useState("")

  const { data: registrations, mutate } = useSWR<Registration[]>("/api/admin/registrations", fetcher)
  const { data: ticketData } = useSWR("/api/admin/ticket-allocation", fetcher)

  const filteredRegistrations =
    registrations?.filter((reg) => {
      const matchesSearch =
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.mobile.includes(searchTerm) ||
        reg.ticket_number.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = selectedStatus === "all" || reg.payment_status === selectedStatus

      return matchesSearch && matchesStatus
    }) || []

  const updatePaymentStatus = async (id: number, status: "verified" | "rejected", notes?: string) => {
    try {
      const response = await fetch("/api/admin/registrations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, payment_status: status, notes }),
      })

      if (response.ok) {
        mutate() // Refresh data
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const allocateTicket = async (registration: Registration) => {
    setSelectedRegistration(registration)
    setNewTicketNumber(ticketData?.nextTicketNumber || "")
    setShowTicketModal(true)
  }

  const confirmTicketAllocation = async () => {
    if (!selectedRegistration || !newTicketNumber) return

    try {
      const response = await fetch("/api/admin/ticket-allocation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: selectedRegistration.id,
          ticketNumber: newTicketNumber,
        }),
      })

      if (response.ok) {
        mutate() // Refresh data
        setShowTicketModal(false)
        setSelectedRegistration(null)
        setNewTicketNumber("")
      }
    } catch (error) {
      console.error("Error allocating ticket:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      verified: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    }
    return styles[status as keyof typeof styles] || styles.pending
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />
    }
  }

  const stats = {
    total: registrations?.length || 0,
    pending: registrations?.filter((r) => r.payment_status === "pending").length || 0,
    verified: registrations?.filter((r) => r.payment_status === "verified").length || 0,
    rejected: registrations?.filter((r) => r.payment_status === "rejected").length || 0,
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Registration Management</h1>
            <p className="text-gray-600">Manage lottery ticket registrations and payment verification</p>
          </div>
        </div>
      </div>

      <main className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or ticket number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Registrations ({filteredRegistrations.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{registration.name}</div>
                        <div className="text-sm text-gray-500">
                          {registration.lottery_type} - {registration.ticket_number}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(registration.registration_date).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{registration.email}</div>
                      <div className="text-sm text-gray-500">{registration.mobile}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">TXN: {registration.transaction_id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(registration.payment_status)}
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(registration.payment_status)}`}
                        >
                          {registration.payment_status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        {registration.payment_status === "pending" && (
                          <>
                            <button
                              onClick={() => updatePaymentStatus(registration.id, "verified")}
                              className="text-green-600 hover:text-green-900 font-medium"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => allocateTicket(registration)}
                              className="text-blue-600 hover:text-blue-900 font-medium flex items-center gap-1"
                            >
                              <Ticket className="w-3 h-3" />
                              Allocate
                            </button>
                            <button
                              onClick={() =>
                                updatePaymentStatus(registration.id, "rejected", "Payment verification failed")
                              }
                              className="text-red-600 hover:text-red-900 font-medium"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {registration.payment_status === "verified" && (
                          <span className="text-green-600 font-medium">Active Ticket</span>
                        )}
                        <button className="text-purple-600 hover:text-purple-900">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Ticket Allocation Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Allocate Ticket Number</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Details</label>
                <p className="text-sm text-gray-600">
                  {selectedRegistration?.name} - {selectedRegistration?.mobile}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Number</label>
                <input
                  type="text"
                  value={newTicketNumber}
                  onChange={(e) => setNewTicketNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter ticket number"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={confirmTicketAllocation}
                className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
              >
                Allocate Ticket
              </button>
              <button
                onClick={() => setShowTicketModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
