"use client"
import { cn } from "@/lib/utils"
import { type ContentData, getContentByKey } from "@/lib/content"
import { useEffect, useState } from "react"

interface PrizeTier {
  prize_rank: number
  prize_name: string
  prize_amount: number
  winner_count: number
}

export default function DailyLotteryOfferSection({ contentData }: { contentData?: ContentData }) {
  const [prizeTiers, setPrizeTiers] = useState<PrizeTier[]>([])
  const [loading, setLoading] = useState(true)

  const sectionContent = contentData ? getContentByKey(contentData.sections, "daily_lottery") : null
  const siteName = contentData?.siteSettings?.site_name || "Kerala State Lotteries Department"

  useEffect(() => {
    async function fetchPrizeTiers() {
      try {
        const response = await fetch("/api/admin/draws")
        if (response.ok) {
          const data = await response.json()
          // Get the latest active draw's prize structure
          const latestDraw = data.draws?.find((draw: any) => draw.status === "active") || data.draws?.[0]
          if (latestDraw?.prize_structure) {
            setPrizeTiers(latestDraw.prize_structure)
          }
        }
      } catch (error) {
        console.error("Failed to fetch prize tiers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrizeTiers()
  }, [])

  return (
    <section aria-labelledby="official-site-title" className="mx-auto max-w-5xl px-4 py-12">
      <div className="text-center">
        <h2
          id="official-site-title"
          className="font-heading text-balance text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          {siteName}
          <span className="whitespace-nowrap"> — OFFICIAL SITE</span>
        </h2>

        <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {sectionContent?.content || (
            <>
              <span className="font-medium">INDEPENDENCE DAY BUMPER DHAMAKA OFFER 2025!</span>{" "}
              <span className="text-muted-foreground">Golden chance to win</span>{" "}
              <span className="font-semibold">₹12 Crore</span>{" "}
              <span className="text-muted-foreground">on the occasion of Durga Puja 2025.</span>
            </>
          )}
        </p>

        {/* Callouts: Daily Lottery / Chance to Win */}
        <div className="mt-6 space-y-5">
          <Callout title="DAILY LOTTERY" />
          <div className="text-sm text-muted-foreground">
            AUGUST 2025 DAILY LOTTERY DRAW
            <br />
            TIME: <span className="font-semibold">03:00 PM</span> TODAY
            <br />
            <span className="font-medium">Just in Rupees 40₹/-</span>
          </div>
          <Callout title="CHANCE TO WIN" />
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Kerala Jackpot Lottery. This lottery is for Indian citizens only. Buy lottery tickets & pay ticket amount
            only.
          </p>
        </div>

        {/* Prize Structure */}
        {!loading && prizeTiers.length > 0 && (
          <div className="mt-8">
            <h3 className="font-heading text-xl font-semibold mb-4">Prize Structure</h3>
            <div className="grid gap-2 max-w-2xl mx-auto">
              {prizeTiers.slice(0, 6).map((tier) => (
                <div key={tier.prize_rank} className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded">
                  <span className="font-medium">{tier.prize_name}</span>
                  <span className="text-brand font-semibold">₹{tier.prize_amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Callout({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Dot className="bg-red-500" />
      <h3 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h3>
      <Dot className="bg-red-500" />
    </div>
  )
}

function Dot({ className }: { className?: string }) {
  return <span aria-hidden className={cn("inline-block h-3 w-3 rounded-full", className)} />
}

function StatPill({ label }: { label: string }) {
  return (
    <span className={cn("rounded-full px-3 py-1", "text-sm font-medium", "bg-muted text-foreground")}>{label}</span>
  )
}
