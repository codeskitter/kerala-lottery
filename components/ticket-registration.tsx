"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function TicketRegistrationSection() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)
    const form = e.currentTarget
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value.trim(),
      ticketNumber: (form.elements.namedItem("ticketNumber") as HTMLInputElement)?.value.trim(),
    }
    setLoading(true)
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed to register ticket")
      setMessage("Ticket registered successfully.")
      form.reset()
    } catch (err: any) {
      setMessage(err?.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section aria-labelledby="ticket-registration-heading" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="ticket-registration-heading" className="text-3xl sm:text-4xl font-semibold text-pretty">
            Register your ticket
          </h2>
          <p className="mt-2 text-muted-foreground">
            Save your contact details and ticket number to get quick status updates.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Full name
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              className="mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-1 ring-border focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              required
              inputMode="tel"
              pattern="[0-9]{10,}"
              placeholder="10+ digits"
              className="mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-1 ring-border focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-1 ring-border focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="ticketNumber" className="block text-sm font-medium">
              Ticket number
            </label>
            <input
              id="ticketNumber"
              name="ticketNumber"
              required
              placeholder="e.g., BR105 123456"
              className="mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-1 ring-border focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white",
                "bg-primary hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                loading && "opacity-70 cursor-not-allowed",
              )}
            >
              {loading ? "Submitting..." : "Register Ticket"}
            </button>
            {message && <p className="mt-3 text-sm">{message}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}
