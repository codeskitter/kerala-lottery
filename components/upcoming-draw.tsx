"use client"
import useSWR from "swr"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function UpcomingDraw() {
  const { data: draws } = useSWR("/api/admin/draws", fetcher)

  const upcomingDraw = draws?.find((draw: any) => draw.status === "upcoming" || draw.status === "Scheduled")

  if (!upcomingDraw) {
    return null
  }

  const drawDate = new Date(upcomingDraw.date)
  const isToday = drawDate.toDateString() === new Date().toDateString()

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-8 text-white text-center">
        <h2 className="font-heading text-3xl font-extrabold">{isToday ? "Today's Draw" : "Upcoming Draw"}</h2>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">{upcomingDraw.name}</h3>
          <p className="mt-2 text-emerald-100">
            Draw Date:{" "}
            {drawDate.toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {isToday && (
            <p className="mt-1 text-emerald-200 font-semibold animate-pulse">Results will be announced today!</p>
          )}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/results" className="btn bg-white text-emerald-600 hover:bg-emerald-50">
            Check Results
          </Link>
          <Link href="/buy-ticket" className="btn bg-emerald-700 text-white hover:bg-emerald-800">
            Buy Tickets
          </Link>
        </div>
      </div>
    </section>
  )
}
