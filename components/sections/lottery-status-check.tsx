"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

type StatusResponse = {
  status: "pending" | "won" | "not-winner"
  message: string
  prize?: string
  tier?: string
  draw?: string
}

export function LotteryStatusCheckSection() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<StatusResponse | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setResult(null)
    const form = e.currentTarget
    const query = (form.elements.namedItem("query") as HTMLInputElement)?.value.trim()

    if (!query) {
      setResult({ status: "pending", message: "Please enter your mobile number or ticket number." })
      return
    }

    const isPhone = /^[0-9]{10,}$/.test(query)
    const payload = isPhone ? { phone: query } : { ticketNumber: query }

    setLoading(true)
    try {
      const res = await fetch("/api/check-lottery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await res.json()) as StatusResponse
      setResult(data)
    } catch {
      setResult({ status: "pending", message: "Unable to check status right now." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative w-full bg-primary/10 px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-white/95 p-5 shadow-md md:p-6">
        <h2 className="font-heading text-2xl font-extrabold tracking-tight text-[#111827]">
          Check Your Lottery Result
        </h2>
        <p className="mt-1 text-sm text-[#6b7280]">
          Enter your ticket number (e.g. KL2545-123456) or mobile number to see your status.
        </p>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <label htmlFor="query" className="block text-sm font-semibold text-[#111827]">
            Ticket Number or Mobile Number
          </label>
          <input
            id="query"
            name="query"
            placeholder="KL2545-123456 or 9876543210"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-[15px] outline-none ring-brand/30 focus:ring-2"
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white",
                loading && "opacity-70",
              )}
            >
              {loading ? "Checking..." : "Check Now"}
            </button>
            <span className="text-xs text-[#6b7280]">We’ll match against the latest draw and return the status.</span>
          </div>
        </form>

        {result && (
          <div className="mt-5">
            <div
              className={cn(
                "rounded-lg border p-4 text-sm",
                result.status === "won" && "border-green-200 bg-green-50 text-green-900",
                result.status === "not-winner" && "border-red-200 bg-red-50 text-red-900",
                result.status === "pending" && "border-yellow-200 bg-yellow-50 text-yellow-900",
              )}
              role="status"
              aria-live="polite"
            >
              <p className="font-semibold">{result.message}</p>
              {result.status === "won" && (
                <div className="mt-2 grid gap-1 text-[13px] text-[#111827] md:text-sm">
                  {result.tier && (
                    <p>
                      Tier: <span className="font-semibold">{result.tier}</span>
                    </p>
                  )}
                  {result.prize && (
                    <p>
                      Prize: <span className="font-semibold">{result.prize}</span>
                    </p>
                  )}
                  {result.draw && (
                    <p>
                      Draw: <span className="font-semibold">{result.draw}</span>
                    </p>
                  )}
                  <p className="text-[#374151]">
                    Keep your original ticket safe. Our support will contact you for verification and claim steps.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
