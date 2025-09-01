"use client"
import { useState } from "react"
import type React from "react"
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin } from "lucide-react"

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  return (
    <>
      {/* Gradient page header */}
      <section className="w-full bg-gradient-to-b from-amber-50 to-transparent py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-heading text-4xl font-extrabold">
            Contact <span className="text-brand">Us</span>
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-muted">
            Have questions or need assistance? We&apos;re here to help!
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Info cards like screenshot */}
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold">Email Support</h3>
            <p className="mt-1 text-sm text-muted">Send us an email and we&apos;ll get back to you within 24 hours.</p>
            <p className="mt-3 font-medium">support@megakeralalottery.com</p>
            <p className="mt-1 text-xs text-muted">24/7 Email Support</p>
          </article>

          <article className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold">Office Location</h3>
            <p className="mt-1 text-sm text-muted">
              3rd Floor KSRTC Building, Directorate of State Lotteries Vikas Bhavan P.O., Thampanoor,
              Thiruvananthapuram, Kerala
            </p>
            <p className="mt-2 text-xs text-muted">Mon–Fri: 10:00 AM – 5:00 PM</p>
          </article>
        </div>

        {/* Map embed */}
        <div className="mt-8 overflow-hidden rounded-xl border border-black/10">
          <iframe
            title="Office Map"
            src="https://www.google.com/maps?q=Thampanoor%20Thiruvananthapuram%20Kerala&output=embed"
            className="h-72 w-full"
            loading="lazy"
          />
        </div>

        {/* Social icons */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <a aria-label="Facebook" href="#" className="text-[#111827] hover:text-amber-600">
            <Facebook className="h-5 w-5" />
          </a>
          <a aria-label="Instagram" href="#" className="text-[#111827] hover:text-amber-600">
            <Instagram className="h-5 w-5" />
          </a>
          <a aria-label="Twitter" href="#" className="text-[#111827] hover:text-amber-600">
            <Twitter className="h-5 w-5" />
          </a>
          <a aria-label="YouTube" href="#" className="text-[#111827] hover:text-amber-600">
            <Youtube className="h-5 w-5" />
          </a>
        </div>

        {/* Existing contact form */}
        <div className="mx-auto mt-10 max-w-3xl">
          <h2 className="font-heading text-xl font-semibold">Send us a Message</h2>
          <form
            className="card mt-4 space-y-5 p-6"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
              setTimeout(() => setSent(false), 1200)
            }}
          >
            <Field label="Your Name" type="text" placeholder="Enter your full name" />
            <Field label="Email Address" type="email" placeholder="Enter your email address" />
            <label className="block">
              <div className="mb-1 text-sm font-medium text-[#111827]">Message</div>
              <textarea
                className="min-h-32 w-full rounded-md border border-gray-200 bg-white px-3 py-3 text-[15px] outline-none ring-1 ring-transparent focus:border-yellow-300 focus:ring-yellow-200"
                placeholder="Write your message..."
              />
            </label>
            <button className="btn btn-brand w-full">{sent ? "Sending..." : "Send Message"}</button>
          </form>
        </div>
      </div>
    </>
  )
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <div className="mb-1 text-sm font-medium text-[#111827]">{label}</div>
      <input
        className="h-12 w-full rounded-md border border-gray-200 bg-white px-3 text-[15px] outline-none ring-1 ring-transparent focus:border-yellow-300 focus:ring-yellow-200"
        {...props}
      />
    </label>
  )
}
