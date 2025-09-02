import { Button } from "@/components/ui/button"

// A responsive, accessible section for the "Independence Day Bumper Dhamaka Offer 2025"
// Uses the current reddish brand (solid red + orange accent) and neutral background.
// Keeps copy concise and formatted; emojis removed for clarity and accessibility.
export function BumperOfferSection() {
  const prizes = [
    { tier: "1st Prize", amount: "₹12 Crore", winners: "1 person" },
    { tier: "2nd Prize", amount: "₹1 Crore", winners: "2 persons" },
    { tier: "3rd Prize", amount: "₹50 Lakh", winners: "5 persons" },
    { tier: "4th Prize", amount: "₹12 Lakh", winners: "10 persons" },
    { tier: "5th Prize", amount: "₹8 Lakh", winners: "12 persons" },
    { tier: "6th Prize", amount: "₹5 Lakh", winners: "15 persons" },
    { tier: "7th Prize", amount: "₹3 Lakh", winners: "20 persons" },
    { tier: "8th Prize", amount: "₹2.5 Lakh", winners: "25 persons" },
    { tier: "9th Prize", amount: "₹1 Lakh", winners: "50 persons" },
    { tier: "10th Prize", amount: "₹50 Thousand", winners: "75 persons" },
    { tier: "11th Prize", amount: "₹25 Thousand", winners: "80 persons" },
    { tier: "12th Prize", amount: "₹10 Thousand", winners: "100 persons" },
  ]

  return (
    <section aria-labelledby="bumper-offer-heading" className="relative py-12 sm:py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <span className="inline-flex items-center rounded-full bg-red-600/10 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
            Daily Lottery • 3:00 PM Today • ₹40
          </span>
          <h2 id="bumper-offer-heading" className="mt-3 text-pretty text-2xl font-semibold tracking-tight sm:text-3xl">
            Independence Day Bumper Dhamaka Offer 2025
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Kerala State Lotteries Department — Official Site. Golden chance to win up to 12 Crore during Durga Puja
            2025. This lottery is for Indian citizens only. Buy tickets and pay the ticket amount only.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <a href="/results" aria-label="Apply now for Kerala State Lottery">
                Apply Now
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#how-it-works">How it works</a>
            </Button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-card p-4">
            <div className="text-sm text-muted-foreground">Today’s Draw</div>
            <div className="mt-1 text-lg font-semibold">AUGUST 2025 Daily Lottery</div>
            <div className="mt-1 text-sm text-muted-foreground">Time: 03:00 PM Today</div>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <div className="text-sm text-muted-foreground">Ticket Price</div>
            <div className="mt-1 text-lg font-semibold">₹40 per ticket</div>
          </div>
        </div>

        {/* Prizes grid */}
        <div className="rounded-2xl border bg-gradient-to-br from-red-600/10 via-orange-500/10 to-red-600/10 p-5 sm:p-6">
          <h3 className="text-lg font-semibold">Chance to Win</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Multiple prize tiers available. See full breakdown below.
          </p>

          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {prizes.map((p) => (
              <li key={p.tier} className="rounded-lg border bg-background px-4 py-3">
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium">{p.tier}</span>
                  <span className="text-xs text-muted-foreground">{p.winners}</span>
                </div>
                <div className="mt-1 text-xl font-semibold text-red-700">{p.amount}</div>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs text-muted-foreground">
            Note: Prize values and counts are provided by the Kerala State Lotteries Department. Please check the
            official site for the latest details and results.
          </p>
        </div>
      </div>
    </section>
  )
}

export default BumperOfferSection
