"use client"
import { Quote } from "lucide-react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function WinnerStories() {
  const { data: testimonials } = useSWR("/api/admin/content/testimonials", fetcher)

  const stories = testimonials?.filter((t: any) => t.is_active && t.prize_amount) || []

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Winner <span className="text-amber-500">Stories</span>
      </h2>
      <p className="mt-3 text-center text-muted-foreground">
        Hear how winning the lottery has transformed the lives of our winners.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {stories.length > 0 ? (
          stories.slice(0, 4).map((story: any) => (
            <article key={story.id} className="rounded-xl border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    {story.avatar_url && (
                      <img
                        src={story.avatar_url || "/placeholder.svg"}
                        alt={story.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{story.name}</div>
                    <div className="text-sm text-muted-foreground">{story.location}</div>
                    <div className="text-xs text-amber-600">₹{story.prize_amount.toLocaleString()} Winner</div>
                  </div>
                </div>
                <div className="my-4 h-px bg-border" />
                <blockquote className="italic text-muted-foreground flex items-start gap-2">
                  <Quote className="h-4 w-4 text-amber-500 mt-1" />
                  <span>{story.testimonial}</span>
                </blockquote>
                <div className="mt-4 text-xs text-muted-foreground">
                  Won on {new Date(story.created_at).toLocaleDateString()}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">Loading winner stories...</div>
        )}
      </div>
    </section>
  )
}
