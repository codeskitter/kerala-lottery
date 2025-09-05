"use client"
import { Button } from "@/components/ui/button"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function BumperOfferSection() {
  const { data: sections } = useSWR("/api/admin/content/sections", fetcher)
  const { data: prizes } = useSWR("/api/admin/prizes", fetcher)

  const sectionsArray = Array.isArray(sections) ? sections : []
  const prizesArray = Array.isArray(prizes) ? prizes : []

  const bumperSection = sectionsArray.find((s: any) => s.section_key === "bumper_offer")
  const bumperPrizes = prizesArray.filter((p: any) => p.category === "bumper") || []

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-extrabold sm:text-4xl text-red-600">
          {bumperSection?.title || "Independence Day Bumper Dhamaka Offer 2025"}
        </h2>
        <p className="mt-3 text-muted-foreground max-w-3xl mx-auto">
          {bumperSection?.content ||
            "Golden chance to win big on the occasion of Independence Day 2025. Don't miss this special bumper lottery!"}
        </p>
      </div>

      {bumperPrizes.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bumperPrizes.map((prize: any) => (
            <div key={prize.id} className="flex items-center justify-between rounded-lg border bg-card p-4">
              <div>
                <div className="font-semibold">{prize.tier}</div>
                <div className="text-sm text-muted-foreground">
                  {prize.count} {prize.count === 1 ? "person" : "persons"}
                </div>
              </div>
              <div className="font-bold text-red-600">₹{prize.amount}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Button size="lg" className="bg-red-600 hover:bg-red-700">
          Buy Bumper Ticket Now
        </Button>
      </div>
    </section>
  )
}

export default BumperOfferSection
