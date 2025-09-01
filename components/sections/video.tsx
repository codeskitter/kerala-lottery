import { Button } from "@/components/ui/button"

export function VideoSection() {
  return (
    <section aria-labelledby="video-title" className="py-16 md:py-24">
      <div className="container max-w-5xl">
        <div className="mx-auto mb-8 md:mb-12 text-center max-w-2xl">
          <h2 id="video-title" className="text-balance text-3xl md:text-4xl font-semibold tracking-tight">
            See How Kerala Lottery Results Work
          </h2>
          <p className="mt-3 text-muted-foreground">
            A quick walkthrough of draw schedules, prize tiers, and how to check results securely.
          </p>
        </div>

        <div
          className="relative rounded-xl border bg-gradient-to-br from-emerald-600/15 to-teal-600/10 p-1 shadow-sm"
          role="region"
          aria-label="Product video"
        >
          <div className="rounded-lg overflow-hidden bg-black">
            {/* 16:9 responsive frame */}
            <div className="relative w-full aspect-video">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0&modestbranding=1&color=white"
                title="Kerala Lottery overview video"
                loading="lazy"
                referrerPolicy="no-referrer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild>
            <a href="/results">Check Today’s Results</a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://www.youtube.com/watch?v=VIDEO_ID"
              target="_blank"
              rel="noreferrer"
              aria-label="Open video on YouTube in a new tab"
            >
              Watch on YouTube
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
