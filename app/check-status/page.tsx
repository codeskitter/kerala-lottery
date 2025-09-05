"use client"

import type React from "react"

import { useState } from "react"
import { Search, CheckCircle, XCircle, Clock, Ticket } from "lucide-react"

type RegistrationStatus = {
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
  statusMessage: string
}

export default function CheckStatusPage() {
  const [ticketNumber, setTicketNumber] = useState("")
  const [mobile, setMobile] = useState("")
  const [loading, setLoading] = useState(false)
  const [registration, setRegistration] = useState<RegistrationStatus | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setRegistration(null)

    try {
      const response = await fetch("/api/registration-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketNumber, mobile }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to check status")
      }

      setRegistration(data.registration)
    } catch (err: any) {
      setError(err.message || "Failed to check registration status")
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-8 h-8 text-green-600" />
      case "rejected":
        return <XCircle className="w-8 h-8 text-red-600" />
      default:
        return <Clock className="w-8 h-8 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-600 bg-green-50 border-green-200"
      case "rejected":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Check Registration Status</h1>
          <p className="text-gray-600">Enter your ticket number and mobile number to check your registration status</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="ticketNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Ticket Number
              </label>
              <input
                id="ticketNumber"
                type="text"
                value={ticketNumber}
                onChange={(e) => setTicketNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your ticket number (e.g., KL-2545)"
                required
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your mobile number"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Checking...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Check Status
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800 font-medium">Error</p>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        )}

        {registration && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Ticket className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Registration Details</h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Card */}
              <div className={`rounded-lg border-2 p-4 ${getStatusColor(registration.payment_status)}`}>
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(registration.payment_status)}
                  <div>
                    <h3 className="font-semibold text-lg capitalize">{registration.payment_status}</h3>
                    <p className="text-sm opacity-90">{registration.statusMessage}</p>
                  </div>
                </div>
              </div>

              {/* Registration Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                  <p className="text-gray-900 font-medium">{registration.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Ticket Number</label>
                  <p className="text-gray-900 font-medium">{registration.ticket_number}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Lottery Type</label>
                  <p className="text-gray-900">{registration.lottery_type}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Mobile</label>
                  <p className="text-gray-900">{registration.mobile}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <p className="text-gray-900">{registration.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Transaction ID</label>
                  <p className="text-gray-900 font-mono text-sm">{registration.transaction_id}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Registration Date</label>
                  <p className="text-gray-900">{new Date(registration.registration_date).toLocaleDateString()}</p>
                </div>

                {registration.verified_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Verified Date</label>
                    <p className="text-gray-900">{new Date(registration.verified_at).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              {registration.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Notes</label>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{registration.notes}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
                >
                  Refresh Status
                </button>
                {registration.payment_status === "verified" && (
                  <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700">
                    View Results
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
