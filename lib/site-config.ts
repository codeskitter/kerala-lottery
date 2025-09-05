export type SiteConfig = {
  site_name: string
  contact_phone: string
  contact_email: string
  upi_id: string
  bank_name: string
  account_name: string
  account_number: string
  ifsc_code: string
  payment_phone: string
  registration_amount: number
}

let cachedConfig: SiteConfig | null = null

export async function getSiteConfig(): Promise<SiteConfig> {
  if (cachedConfig) return cachedConfig

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/site-config`, {
      cache: "no-store",
    })
    if (!res.ok) throw new Error("Failed to fetch site config")
    const data = await res.json()
    cachedConfig = data
    return data
  } catch (error) {
    console.error("Error fetching site config:", error)
    // Return fallback data
    return {
      site_name: "Kerala Jackpot Mega Lottery",
      contact_phone: "+91 96686 43802",
      contact_email: "info@keralajackpot.com",
      upi_id: "keralajackpot@upi",
      bank_name: "State Bank of India",
      account_name: "Kerala State Lotteries",
      account_number: "1234567890123456",
      ifsc_code: "SBIN0001234",
      payment_phone: "+91 99429 31164",
      registration_amount: 447,
    }
  }
}

// Clear cache when config is updated
export function clearSiteConfigCache() {
  cachedConfig = null
}
