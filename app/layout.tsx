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

          {/* Existing Contact Us button */}
          <a
            href="/contact"
            aria-label="Contact us"
            className="fixed bottom-6 right-6 rounded-full bg-[var(--brand)] px-4 py-3 text-white shadow-lg transition hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand)]"
          >
            <span className="inline-flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 12a8 8 0 1 1-3.1-6.3L21 5l-.7 3.1A7.96 7.96 0 0 1 21 12Z" fill="currentColor" />
              </svg>
              <span className="text-sm font-semibold">Contact Us</span>
            </span>
          </a>

          <a
            href="https://wa.me/+919668643802"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-6 right-28 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
          >
            <span className="inline-flex items-center gap-2">
              {/* WhatsApp icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 448 512"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 224.7 32 106.5 32 10.7 127.8 10.7 246c0 42.8 11.2 84.5 32.5 121.2L0 480l116.5-42.9c35.7 19.5 75.9 29.8 116.9 29.8h.6c118.2 0 214-95.8 214-214.1.1-58.4-22.9-114.2-64.1-156.3zM224 438.7h-.5c-36.5-.1-72.3-9.8-103.6-28.3l-7.4-4.4-69.1 25.4 24.9-70.9-4.8-7.3c-20.4-31.1-31.1-67.3-31.1-104.2 0-107.5 87.5-195 195.1-195 52 0 100.9 20.3 137.6 57.1 36.7 36.8 57 85.6 56.9 137.6-.1 107.5-87.5 194.9-195.1 194.9zm101.6-146.8c-5.6-2.8-33.1-16.3-38.2-18.2-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18.2-17.6 22c-3.2 3.7-6.5 4.2-12.1 1.4-32.9-16.4-54.5-29.2-76.2-66.2-5.8-9.9 5.8-9.2 16.4-30.6 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.2-17.1-41.4-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.8 22.7 57.5c2.8 3.7 39.2 59.8 95 84.1 13.3 5.7 23.6 9.1 31.7 11.6 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 33.1-13.5 37.7-26.5 4.6-13 4.6-24.1 3.2-26.5-1.3-2.2-5-3.6-10.6-6.4z" />
              </svg>
              <span className="text-sm font-semibold">WhatsApp</span>
            </span>
          </a>
        </ShowWhenPublic>
      </body>
    </html>
  )
}
