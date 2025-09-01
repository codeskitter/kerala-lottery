import { Quote } from "lucide-react"

export function WinnerStories() {
  const stories = [
    {
      name: "Shyamal Giri",
      region: "West Bengal",
      tag: "1200000 Winner",
      quote: "Winning the Kerala State Mega Lottery lottery has been a life-changing experience!",
      meta: "Won on 30/08/2025 · Kerala State Mega Lottery",
    },
    {
      name: "Shaik Ejaz",
      region: "West Bengal",
      tag: "1200000 Winner",
      quote: "Winning the Kerala State Mega Lottery lottery has been a life-changing experience!",
      meta: "Won on 30/08/2025 · Kerala State Mega Lottery",
    },
  ]
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Winner <span className="text-amber-500">Stories</span>
      </h2>
      <p className="mt-3 text-center text-muted-foreground">
        Hear how winning the lottery has transformed the lives of our winners.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {stories.map((s) => (
          <article key={s.name} className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-muted" aria-hidden />
                <div className="flex-1">
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-sm text-muted-foreground">{s.region}</div>
                  <div className="text-xs text-amber-600">{s.tag}</div>
                </div>
              </div>
              <div className="my-4 h-px bg-border" />
              <blockquote className="italic text-muted-foreground flex items-start gap-2">
                <Quote className="h-4 w-4 text-amber-500 mt-1" />
                <span>{s.quote}</span>
              </blockquote>
              <div className="mt-4 text-xs text-muted-foreground">{s.meta}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
