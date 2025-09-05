import Image from "next/image"
import type { ContentData } from "@/lib/content"

export function RecentWinners({ contentData }: { contentData?: ContentData }) {
  const winners = contentData?.testimonials?.filter((t) => t.is_active) || []

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h3 className="font-heading text-center text-3xl font-extrabold sm:text-4xl">
        Recent <span className="text-brand">Winners</span>
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
        Congratulations to our latest winners from across Kerala.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {winners.length > 0 ? (
          winners.slice(0, 6).map((winner, i) => (
            <article key={winner.id} className="card overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={winner.avatar_url || "/placeholder.svg?height=300&width=400&query=winner"}
                  alt={`${winner.name} from ${winner.location}`}
                  fill
                  priority={i < 2}
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <div className="label">₹{winner.prize_amount?.toLocaleString()}</div>
                <h4 className="mt-1 line-clamp-1 font-heading text-base font-semibold">{winner.name}</h4>
                <p className="mt-1 text-xs text-muted">{winner.location}</p>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{winner.testimonial}</p>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-8">
            <p>No recent winners to display at the moment.</p>
            <p className="text-sm mt-2">Check back soon for updates!</p>
          </div>
        )}
      </div>
    </section>
  )
}
