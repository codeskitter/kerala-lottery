"use client"

import { useMemo, useState } from "react"

type Package = {
  id: string
  name: string
  price: number
  paid: number
  free: number
}

const PACKAGES: Package[] = [
  { id: "normal", name: "NORMAL PACKAGE", price: 149, paid: 1, free: 0 },
  { id: "silver", name: "SILVER PACKAGE", price: 447, paid: 3, free: 1 },
  { id: "gold", name: "GOLDEN PACKAGE", price: 745, paid: 5, free: 3 },
  { id: "mega40", name: "Kerala State Mega lottery", price: 40, paid: 1, free: 0 },
  { id: "mega120", name: "Kerala State Government Mega jackpot Lottery", price: 120, paid: 3, free: 0 },
  { id: "gov200", name: "Kerala Government lottery", price: 200, paid: 5, free: 3 },
  { id: "gov400", name: "Kerala State Government Mega jackpot Lottery", price: 400, paid: 10, free: 7 },
  { id: "shree298", name: "SHREESHAKTI MEGA LOTTERY TICKET BOOKING", price: 298, paid: 2, free: 1 },
]

export default function BuyTicketPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [selected, setSelected] = useState<Package | null>(PACKAGES[1])
  const [form, setForm] = useState({
    name: "Pintu Das",
    email: "school1@gmail.com",
    phone: "7980621815",
    state: "West Bengal",
    lottery: "Kerala State Mega Lottery",
    txn: "",
  })

  const total = useMemo(() => selected?.price ?? 0, [selected])

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      {/* Heading */}
      <div className="text-center">
        <h1 className="font-heading text-4xl font-extrabold md:text-5xl">
          Buy Your <span className="text-brand">Lottery Ticket</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted">
          Fill in your details below to purchase your ticket and get a chance to win big!
        </p>
      </div>

      {/* Stepper */}
      <ol className="mx-auto mt-8 grid max-w-4xl grid-cols-4 gap-4 rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm">
        {[
          ["1", "Select Package"],
          ["2", "Enter Details"],
          ["3", "Payment"],
          ["4", "Confirmation"],
        ].map(([n, label], i) => {
          const idx = (i + 1) as 1 | 2 | 3 | 4
          const active = step === idx
          return (
            <li key={n} className="flex flex-col items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm ${
                  active ? "border-yellow-400 bg-yellow-100 text-yellow-700" : "border-black/20 text-muted"
                }`}
              >
                {n}
              </span>
              <span className={`text-xs ${active ? "font-medium text-foreground" : "text-muted"}`}>{label}</span>
            </li>
          )
        })}
      </ol>

      {/* Content */}
      <div className="mt-10">
        {step === 1 && (
          <>
            <h2 className="text-center font-heading text-xl font-semibold">Select Your Ticket Package</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PACKAGES.map((p) => {
                const isSelected = selected?.id === p.id
                return (
                  <article
                    key={p.id}
                    className={`rounded-2xl border p-6 shadow-sm transition ${
                      isSelected ? "border-yellow-400 bg-yellow-50" : "border-black/10 bg-white"
                    }`}
                  >
                    <h3 className="text-center font-heading text-sm font-semibold uppercase tracking-wide">{p.name}</h3>
                    <div className="mt-3 text-center text-2xl font-bold text-brand">₹{p.price}</div>
                    <p className="mt-1 text-center text-sm text-muted">
                      {p.paid} Paid Tickets + {p.free} Free Tickets
                      <br />
                      Total Tickets: {p.paid + p.free}
                    </p>
                    <button
                      onClick={() => setSelected(p)}
                      className={`btn mt-5 w-full ${
                        isSelected ? "btn-brand" : "border border-black/10 bg-white text-foreground hover:bg-black/5"
                      }`}
                    >
                      {isSelected ? "Selected" : "Select Package"}
                    </button>
                  </article>
                )
              })}
            </div>
            <div className="mt-8 flex justify-end">
              <button className="btn btn-brand" onClick={() => setStep(2)}>
                Continue →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="grid gap-5">
              {(["name", "email", "phone", "state"] as const).map((k) => (
                <label key={k} className="block">
                  <div className="mb-1 text-sm font-medium text-[#111827]">
                    {k === "name"
                      ? "Full Name"
                      : k === "email"
                        ? "Email Address"
                        : k === "phone"
                          ? "Phone Number"
                          : "State"}
                  </div>
                  <input
                    className="h-12 w-full rounded-md border border-gray-200 bg-white px-3 text-[15px] outline-none focus:border-yellow-300"
                    value={form[k]}
                    onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                  />
                </label>
              ))}

              <label className="block">
                <div className="mb-1 text-sm font-medium text-[#111827]">Lottery Type</div>
                <select
                  className="h-12 w-full rounded-md border border-gray-200 bg-white px-3 text-[15px] outline-none focus:border-yellow-300"
                  value={form.lottery}
                  onChange={(e) => setForm((f) => ({ ...f, lottery: e.target.value }))}
                >
                  <option>Kerala State Mega Lottery</option>
                  <option>Nirmal Lottery</option>
                  <option>Karunya Lottery</option>
                </select>
              </label>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button className="btn border border-black/10 bg-white hover:bg-black/5" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button className="btn btn-brand" onClick={() => setStep(3)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
              <h3 className="text-center font-heading text-lg font-semibold">Pay via QR Code</h3>
              <div className="mt-4 flex justify-center">
                <div className="rounded-lg border-4 border-blue-600 bg-white p-2">
                  <img src="/upi-qr-code.png" alt="UPI QR Code" width={220} height={220} />
                </div>
              </div>
              <button className="btn btn-brand mt-4 w-full">Download QR Code</button>
              <p className="mt-2 text-center text-sm text-muted">Scan the QR code to pay ₹{total} via UPI</p>
              <p className="mt-1 text-center font-semibold text-brand">₹{total}</p>
            </div>

            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
              <h3 className="text-center font-heading text-lg font-semibold">Pay via Any of the following</h3>
              <div className="mt-3 flex items-center justify-center gap-3 text-2xl">
                <span>GPay</span>
                <span>•</span>
                <span>PhonePe</span>
                <span>•</span>
                <span>Paytm</span>
              </div>
              <div className="mt-3 text-center font-semibold text-brand">9942931164</div>
              <p className="text-center text-sm text-muted">Send ₹{total} to this Google Pay number</p>
              <p className="mt-1 text-center font-semibold text-brand">₹{total}</p>
            </div>

            <div className="md:col-span-2">
              <label className="block">
                <div className="mb-1 text-sm font-medium text-[#111827]">Transaction ID</div>
                <input
                  className="h-12 w-full rounded-md border border-gray-200 bg-white px-3 text-[15px] outline-none focus:border-yellow-300"
                  placeholder="Enter your payment transaction id"
                  value={form.txn}
                  onChange={(e) => setForm((f) => ({ ...f, txn: e.target.value }))}
                />
              </label>

              <div className="mt-6 flex items-center justify-between">
                <button className="btn border border-black/10 bg-white hover:bg-black/5" onClick={() => setStep(2)}>
                  ← Back
                </button>
                <button className="btn btn-brand" onClick={() => setStep(4)}>
                  Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="mx-auto max-w-xl rounded-2xl border border-yellow-200 bg-yellow-50 p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
              ✓
            </div>
            <h3 className="font-heading text-2xl font-semibold">Purchase Summary</h3>
            <p className="mt-1 text-muted">Review your details before confirming.</p>

            <div className="mx-auto mt-6 max-w-md rounded-xl border border-black/10 bg-white p-5 text-left shadow-sm">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Name:</dt>
                  <dd>{form.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Email:</dt>
                  <dd>{form.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Phone:</dt>
                  <dd>{form.phone}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">State:</dt>
                  <dd>{form.state}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Lottery:</dt>
                  <dd>{form.lottery}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Package:</dt>
                  <dd>{selected ? `${selected.name} (${selected.paid} tickets + ${selected.free} free)` : "—"}</dd>
                </div>
                <div className="flex justify-between font-semibold">
                  <dt>Total:</dt>
                  <dd className="text-brand">₹{total}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button className="btn border border-black/10 bg-white hover:bg-black/5" onClick={() => setStep(3)}>
                ← Back
              </button>
              <button className="btn btn-brand">Buy Now →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
