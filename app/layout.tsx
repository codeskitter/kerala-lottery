import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"
import { ShowWhenPublic } from "@/components/admin/show-when-public"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Mega Kerala Lottery",
  description: "Kerala lottery website",
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="bg-background text-foreground">
        <ShowWhenPublic>
          <SiteHeader />
        </ShowWhenPublic>

        <main className="min-h-[calc(100dvh-64px)]">{children}</main>

        <ShowWhenPublic>
          {/* Use full footer component on all public pages */}
          <SiteFooter />

          {/* Floating phone button (hidden on /admin) */}
          <a
            href="tel:+911234567890"
            aria-label="Call support"
            className="fixed bottom-6 right-6 rounded-full bg-[var(--brand)] text-white shadow-lg transition hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand)]"
          >
            <span className="sr-only">Call</span>
            <svg width="52" height="52" viewBox="0 0 52 52">
              <g transform="translate(14,14)">
                <path
                  d="M16.4 13.7c-1 .9-2.2 1.5-3.4 1.8-2.1-.9-4-2.2-5.6-3.9-1.7-1.6-3-3.5-3.9-5.6.3-1.2.9-2.4 1.8-3.4l1.2-1.2c.5-.5.5-1.2.1-1.7L5.2.4C4.8 0 4.1 0 3.6.4L2 .9C.8 1.4 0 2.6 0 3.9c0 5 2.2 9.8 6 13.6s8.6 6 13.6 6c1.3 0 2.5-.8 3-2l.5-1.6c.2-.6 0-1.3-.5-1.7l-1.5-1.2c-.5-.4-1.3-.4-1.7.1l-1.2 1.2z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </a>
        </ShowWhenPublic>
      </body>
    </html>
  )
}
