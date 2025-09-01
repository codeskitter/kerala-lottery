"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const params = useSearchParams()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ password }),
    })
    setLoading(false)
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      setError(j?.error || "Login failed")
      return
    }
    const next = params.get("next") || "/admin"
    // Ensure middleware sees the new cookie by doing a full navigation.
    window.location.assign(next)
  }

  return (
    <div className="min-h-dvh w-full flex items-center justify-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-lg border bg-card p-5 flex flex-col gap-4"
        aria-label="Admin login"
      >
        <div>
          <h1 className="font-heading text-xl font-semibold text-center">Admin Login</h1>
          <p className="text-sm text-muted text-center mt-1">Enter the admin password to access the dashboard.</p>
        </div>

        <label className="text-sm">
          <div className="label">Password</div>
          <input
            type="password"
            className="mt-1 w-full h-10 rounded-md border px-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-required="true"
          />
        </label>

        {error ? (
          <div className="text-sm text-accent" role="alert">
            {error}
          </div>
        ) : null}

        <button className="btn btn-brand w-full h-10" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-xs text-muted text-center">
          Tip: set the ADMIN_PASSWORD environment variable for production.
        </p>
      </form>
    </div>
  )
}
