"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { getSiteConfig, type SiteConfig } from "@/lib/site-config"
import type { ContentData } from "@/lib/content"

interface WelcomeRegisterSectionProps {
  contentData?: ContentData
}

export default function WelcomeRegisterSection({ contentData }: WelcomeRegisterSectionProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null)
  const [form1, setForm1] = useState({
    lottery: "Kerala State Mega Lottery",
    ticketNumber: "",
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    getSiteConfig().then(setSiteConfig)
  }, [])

  if (!siteConfig) {
    return <div className="bg-background w-full py-12 text-center">Loading...</div>
  }

  const amount = `₹${siteConfig.registration_amount}`

  const welcomeContent = contentData?.sections?.find((s) => s.section_key === "welcome_register")
  const siteTitle = contentData?.siteSettings?.site_name || siteConfig.site_name
  const siteTagline = contentData?.siteSettings?.site_tagline || "Welcome to the State Kerala Jackpot Lottery"

  function handleStep1Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)
    const fd = new FormData(e.currentTarget)
    const next = {
      lottery: (fd.get("lottery") as string) || "Kerala State Mega Lottery",
      ticketNumber: (fd.get("ticketNumber") as string) || "",
      name: (fd.get("name") as string) || "",
      email: (fd.get("email") as string) || "",
      phone: (fd.get("phone") as string) || "",
    }
    if (!next.name || !next.email || !next.phone || !next.ticketNumber) {
      setMessage("Please fill all required fields.")
      return
    }
    setForm1(next)
    setStep(2)
  }

  async function handleStep2Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)
    const fd = new FormData(e.currentTarget)
    const paymentTxnId = (fd.get("paymentTxnId") as string) || ""
    if (!paymentTxnId || paymentTxnId.trim().length < 6) {
      setMessage("Please enter a valid Transaction/UTR ID.")
      return
    }

    try {
      setLoading(true)
      console.log("[v0] Submitting registration:", { ...form1, paymentTxnId })

      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form1,
          paymentTxnId,
          amount,
          upiId: siteConfig.upi_id,
        }),
      })

      const data = await res.json().catch(() => ({}))
      console.log("[v0] Registration response:", data)

      if (!res.ok) throw new Error(data?.error || "Something went wrong")

      setMessage(data?.message || "Registration submitted successfully! Payment will be verified within 24 hours.")
      setStep(1)
      setForm1({
        lottery: "Kerala State Mega Lottery",
        ticketNumber: "",
        name: "",
        email: "",
        phone: "",
      })
      ;(e.currentTarget as HTMLFormElement).reset()
    } catch (err: any) {
      console.log("[v0] Registration error:", err)
      setMessage(err?.message || "Could not submit registration. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-background w-full">
      <div className="mx-auto grid w-full grid-cols-1 gap-8 px-4 md:px-8 py-12 md:grid-cols-2 lg:py-12 bg-slate-100 text-left">
        {/* Left: Welcome copy */}
        <div>
          <h2 className="font-heading text-pretty text-3xl font-extrabold md:text-4xl text-black">
            {siteTitle} — <span className="text-brand">OFFICIAL SITE</span>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{siteTagline}</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-[#065f46] md:justify-start">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 11 19.5a19.5 19.5 0 0 1-7.5-7.5A19.86 19.86 0 0 1 2.09 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.6 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.12a2 2 0 0 1 2.11-.45c.84.28 1.71.48 2.61.6A2 2 0 0 1 22 16.92Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-2xl font-bold">{siteConfig.contact_phone}</span>
          </div>

          <p className="text-pretty mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground">
            {welcomeContent?.content ||
              "Playing the lottery is your chance to win big and change your life forever. Our online system makes it easy to buy tickets securely and check results quickly. Register now and participate in upcoming draws."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="/results" className="btn btn-accent inline-flex items-center gap-2">
              Check Winner
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
            <a href="/buy-ticket" className="btn btn-brand inline-flex items-center gap-2">
              Buy Ticket
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
            <a href="/check-status" className="btn btn-secondary inline-flex items-center gap-2">
              Check Status
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: Register + Payment */}
        <div>
          <div className="card mx-auto p-6">
            <h3 className="font-heading text-center text-xl font-semibold">Register Here</h3>

            {/* Simple step indicator */}
            <div className="mt-2 mb-2 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
              <span className={step === 1 ? "text-foreground" : ""}>Step 1: Details</span>
              <span aria-hidden>→</span>
              <span className={step === 2 ? "text-foreground" : ""}>Step 2: Payment</span>
            </div>

            {step === 1 ? (
              <form onSubmit={handleStep1Submit} className="mt-4 space-y-3">
                <div>
                  <label className="label">Select Lottery</label>
                  <select
                    name="lottery"
                    className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
                    defaultValue={form1.lottery}
                  >
                    <option>Kerala State Mega Lottery</option>
                    <option>Sunday Bumper</option>
                    <option>Akshaya</option>
                    <option>Win-Win</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="ticketNumber" className="label">
                    Ticket Number
                  </label>
                  <select
                    id="ticketNumber"
                    name="ticketNumber"
                    className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
                    defaultValue={form1.ticketNumber || ""}
                    required
                  >
                    <option value="" disabled>
                      Select your lottery ticket
                    </option>
                    <option value="KL-2545">KL-2545</option>
                    <option value="KL-49786">KL-49786</option>
                    <option value="KL 77151">KL 77151</option>
                    <option value="KL 88287">KL 88287</option>
                    <option value="KL 09130">KL 09130</option>
                    <option value="KL 58076">KL 58076</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="name" className="label">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
                    placeholder="Your full name"
                    defaultValue={form1.name}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
                    placeholder="you@example.com"
                    defaultValue={form1.email}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="label">
                    Mobile No.
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    inputMode="numeric"
                    required
                    className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
                    placeholder="+91-XXXXXXXXXX"
                    defaultValue={form1.phone}
                  />
                </div>

                <button type="submit" className="btn btn-brand w-full justify-center">
                  Continue to Payment
                </button>

                {message && (
                  <p className="text-center text-sm text-[#065f46]" role="status" aria-live="polite">
                    {message}
                  </p>
                )}
              </form>
            ) : (
              <form onSubmit={handleStep2Submit} className="mt-4 space-y-3">
                {/* Summary */}
                <div className="rounded-md border bg-white p-3 text-xs text-muted-foreground">
                  <div className="font-medium text-foreground">Review details</div>
                  <ul className="mt-1 grid grid-cols-2 gap-2">
                    <li>
                      <span className="text-foreground">Lottery:</span> {form1.lottery}
                    </li>
                    <li>
                      <span className="text-foreground">Ticket:</span> {form1.ticketNumber}
                    </li>
                    <li>
                      <span className="text-foreground">Name:</span> {form1.name}
                    </li>
                    <li>
                      <span className="text-foreground">Phone:</span> {form1.phone}
                    </li>
                    <li className="col-span-2">
                      <span className="text-foreground">Email:</span> {form1.email}
                    </li>
                  </ul>
                </div>

                {/* Payment instructions */}
                <div className="rounded-md border bg-white p-3">
                  <p className="text-sm">
                    Pay {amount} via UPI to <span className="font-semibold">{siteConfig.upi_id}</span>, then enter your
                    Transaction/UTR ID below for confirmation.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      className="w-full rounded-md border bg-white px-3 py-2 text-sm"
                      value={siteConfig.upi_id}
                      readOnly
                      aria-label="UPI ID"
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        navigator.clipboard?.writeText(siteConfig.upi_id)
                      }}
                    >
                      Copy
                    </button>
                  </div>

                  <div className="mt-3">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${siteConfig.upi_id}&pn=${encodeURIComponent(siteConfig.account_name)}&am=${siteConfig.registration_amount}&cu=INR`}
                      alt="Scan to pay via UPI"
                      className="mx-auto h-auto w-48 rounded-md border"
                    />
                    <p className="mt-2 text-center text-xs text-muted-foreground">Scan QR to pay</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="paymentTxnId" className="label">
                    Transaction / UTR ID
                  </label>
                  <input
                    id="paymentTxnId"
                    name="paymentTxnId"
                    required
                    className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
                    placeholder="Enter your UPI transaction/UTR ID"
                  />
                </div>

                <div className="flex gap-3">
                  <button type="button" className="btn btn-secondary flex-1" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="btn btn-brand flex-1">
                    {loading ? "Submitting..." : "Submit for Confirmation"}
                  </button>
                </div>

                {message && (
                  <p className="text-center text-sm text-[#065f46]" role="status" aria-live="polite">
                    {message}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
