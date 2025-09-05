"use client"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function Testimonials() {
  const { data: testimonials } = useSWR("/api/admin/content/testimonials", fetcher)

  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-gray-50" />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-center text-3xl font-bold">
          What Our <span className="text-amber-500">Winners Say</span>
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          Hear from our lottery winners about their life-changing experiences.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials && testimonials.length > 0 ? (
            testimonials
              .filter((t: any) => t.is_active)
              .map((item: any) => (
                <div key={item.id} className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                      {item.avatar_url && (
                        <img
                          src={item.avatar_url || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.location}</div>
                      {item.prize_amount && (
                        <div className="text-xs text-amber-600">₹{item.prize_amount.toLocaleString()} Winner</div>
                      )}
                    </div>
                  </div>
                  <blockquote className="mt-4 italic text-muted-foreground">"{item.testimonial}"</blockquote>
                </div>
              ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">Loading testimonials...</div>
          )}
        </div>
      </div>
    </section>
  )
}
