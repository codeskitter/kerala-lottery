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
          className="relative rounded-xl border bg-gradient-to-br from-red-600/15 to-orange-500/10 p-1 shadow-sm"
          role="region"
          aria-label="Product videos"
        >
          <div className="rounded-lg overflow-hidden bg-black">
            {/* Horizontal scroll-snap on mobile, centered items on larger screens */}
            <div
              className="flex gap-4 overflow-x-auto p-2 md:p-3 snap-x snap-mandatory scroll-p-4"
              aria-label="Video carousel"
            >
              {/* Video 1 */}
              <div className="snap-center shrink-0 w-full md:w-[720px]">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    aria-label="Kerala Lottery highlight video 1"
                  >
                    <source
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-09-02%20at%2018.52.04_a8b1ccce-QEMONxiPcubiBKdzt2fZ313DgGGBgr.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Video 2 */}
              <div className="snap-center shrink-0 w-full md:w-[720px]">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    aria-label="Kerala Lottery highlight video 2"
                  >
                    <source
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-09-02%20at%2018.52.04_a8b1ccce-25AXPSXKrDpkl5FHyCx48xxYmnDdSF.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild>
            <a href="/results">Check Today’s Results</a>
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
