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
              {/* swap YouTube iframe for native HTML5 video with poster and controls */}
              <video
                className="absolute inset-0 h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster="/kerala-lottery-overview-poster.png"
                aria-label="Kerala Lottery overview video"
              >
                <source src="/videos/intro.mp4" type="video/mp4" />
                {/*
                <track
                  kind="captions"
                  src="/videos/intro.vtt"
                  srcLang="en"
                  label="English captions"
                  default
                />
                */}
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild>
            <a href="/results">Check Today&apos;s Results</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/#how-it-works" aria-label="Learn how it works section">
              Learn how it works
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
