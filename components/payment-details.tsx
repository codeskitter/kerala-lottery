"use client"

import { useState } from "react"

function CopyBtn({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        if (!value) return
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1200)
        } catch {}
      }}
      className="btn btn-secondary"
      aria-label={`Copy ${label}`}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

export default function PaymentDetailsSection() {
  const upiId = process.env.NEXT_PUBLIC_UPI_ID || "upi@ybl"
  const amount = process.env.NEXT_PUBLIC_REGISTRATION_AMOUNT || "₹499"
  const bankName = process.env.NEXT_PUBLIC_BANK_NAME || "Bank Name"
  const accountName = process.env.NEXT_PUBLIC_ACCOUNT_NAME || "Account Name"
  const accountNumber = process.env.NEXT_PUBLIC_ACCOUNT_NUMBER || "0000000000"
  const ifsc = process.env.NEXT_PUBLIC_IFSC || "IFSC0000"
  const payPhone = process.env.NEXT_PUBLIC_PAYMENT_PHONE || "+91 90000 00000"

  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-center font-heading text-3xl font-extrabold text-foreground">Payment Details</h2>
        <p className="mx-auto mt-2 mb-8 max-w-2xl text-center text-muted-foreground">
          Pay {amount} via any of the options below. After payment, submit your Transaction/UTR ID in Step 2 of the
          registration form for confirmation.
        </p>

        <div className="grid items-stretch gap-6 md:grid-cols-3 lg:gap-8">
          {/* UPI Box */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm md:p-8">
            <h3 className="text-center font-heading text-lg font-semibold text-foreground">Pay via QR Code</h3>

            <div className="mt-6 flex flex-col items-center">
              <div className="rounded-xl bg-white p-2 ring-2 ring-sky-400">
                <img src="/images/upi-qr.jpg" alt="UPI QR code for payment" className="h-auto w-48 rounded-md" />
              </div>

              <a
                href="/images/upi-qr.jpg"
                download
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:from-green-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                aria-label="Download UPI QR Code"
              >
                Download QR Code
              </a>

              <p className="mt-3 text-center text-xs text-muted-foreground">Scan the QR code to pay {amount} via UPI</p>
              <div className="mt-1 text-center text-base font-semibold text-emerald-600">{amount}</div>

              <div className="mt-5 w-full">
                <label className="label">UPI ID</label>
                <div className="flex items-center gap-2">
                  <input
                    value={upiId}
                    readOnly
                    className="w-full rounded-md border bg-white px-3 py-2 text-sm"
                    aria-label="UPI ID"
                  />
                  <CopyBtn value={upiId} label="UPI ID" />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Apps Box */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center shadow-sm md:p-8">
            <h3 className="font-heading text-lg font-semibold text-foreground">Pay via Any of the following</h3>
            <div className="mt-4 text-lg font-semibold text-foreground">GPay • PhonePe • Paytm</div>

            <a
              href={`tel:${payPhone.replace(/\\s+/g, "")}`}
              className="mt-3 inline-block text-lg font-bold text-emerald-600 underline decoration-emerald-300 hover:text-emerald-700"
              aria-label="Payment phone number"
            >
              {payPhone}
            </a>

            <p className="mt-2 text-sm text-muted-foreground">Send {amount} to this number</p>
            <div className="mt-1 text-base font-semibold text-emerald-600">{amount}</div>

            <div className="mt-5 flex items-center justify-center gap-2">
              <CopyBtn value={payPhone} label="Phone Number" />
            </div>
          </div>

          {/* Bank Box */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm md:p-8">
            <h3 className="text-center font-heading text-lg font-semibold text-foreground">Bank Transfer</h3>
            <dl className="mt-6 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Bank</dt>
              <dd className="text-foreground">{bankName}</dd>
              <dt className="text-muted-foreground">Account Name</dt>
              <dd className="text-foreground">{accountName}</dd>
              <dt className="text-muted-foreground">Account No.</dt>
              <dd className="text-foreground">{accountNumber}</dd>
              <dt className="text-muted-foreground">IFSC</dt>
              <dd className="text-foreground">{ifsc}</dd>
            </dl>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <CopyBtn value={accountNumber} label="Account Number" />
              <CopyBtn value={ifsc} label="IFSC" />
            </div>
            <div className="mt-4 text-center text-xs text-muted-foreground">
              Transfer exactly {amount} and keep your Transaction/UTR ID for confirmation.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
