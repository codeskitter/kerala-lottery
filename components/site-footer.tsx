import { Mail, MapPin, Facebook, Instagram } from "lucide-react"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-[#F6F6F6] text-foreground">
      {/* CTA band */}
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-pretty text-3xl font-semibold md:text-4xl">
          Ready to <span className="text-brand">Change Your Life?</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Don&apos;t miss your chance to win big with Mega Kerala Lottery. Buy your ticket now!
        </p>
        <Link href="/buy-ticket" className="mt-6 btn btn-brand inline-flex items-center justify-center">
          Buy Ticket Now
          <span className="ml-2">→</span>
        </Link>
      </div>

      {/* footer content */}
      <div className="border-t border-black/10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight">MEGA KERALA</span>
              <span className="rounded bg-brand px-2 py-0.5 text-xs font-semibold text-white">LOTTERY</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Experience the thrill of winning with Kerala&apos;s premier lottery platform. Secure, transparent, and
              life-changing prizes await!
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Link aria-label="Facebook" href="#" className="rounded-full border border-black/10 p-2 hover:bg-black/5">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                aria-label="Instagram"
                href="#"
                className="rounded-full border border-black/10 p-2 hover:bg-black/5"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-brand">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/buy-ticket" className="hover:underline">
                  Buy Ticket
                </Link>
              </li>
              <li>
                <Link href="/check-results" className="hover:underline">
                  Check Results
                </Link>
              </li>
              <li>
                <Link href="/winners" className="hover:underline">
                  Winners
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:underline">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-brand">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Legal Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-brand">Contact Us</h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4" />
                <span>support@megakeralalottery.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4" />
                <span>
                  3rd Floor KSRTC Building, Directorate of State Lotteries Vikas Bhavan P.O., Thampanoor,
                  Thiruvananthapuram, Kerala
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
