"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

const slides = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-02%20at%2018.52.07_203c77d6.jpg-1vZpdKC7tKEhPD6xoYANIy0qkisKG1.jpeg",
    alt: "Officials presenting Kerala lottery bumper poster at a press event",
    cta: { href: "/results", label: "Check Live Results" },
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-02%20at%2018.52.05_85201168.jpg-pDvT3BP78KbEeQmMlpMMy5KigIxjPd.jpeg",
    alt: "Group celebrating inside a shop while holding a lottery ticket",
    cta: { href: "/buy-ticket", label: "Buy Ticket Now" },
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-02%20at%2018.52.07_b79e9f08.jpg-D36E8zE5RXNz0xpANoCTJYLefzd8SM.jpeg",
    alt: "Group holding a large Kerala lottery banner during an indoor event",
    cta: { href: "/buy-ticket", label: "Buy Ticket Now" },
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-02%20at%2018.52.05_e012639f.jpg-BzN0SKp6lriMpxFq8u3Gha2c2oJJI4.jpeg",
    alt: "Smiling person raising a lottery ticket with another person beside",
    cta: { href: "/results", label: "Check Live Results" },
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-02%20at%2018.52.07_26824cdf.jpg-gGYdAb5gtCt0W00cRoeCf8fEJuQvIU.jpeg",
    alt: "Officials holding a colorful Kerala lottery banner at a function",
    cta: { href: "/buy-ticket", label: "Buy Ticket" },
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-02%20at%2018.52.06_c0447d52.jpg-JDtOwMgxWpC81JIlGJQuth6QHUgUXH.jpeg",
    alt: "Officials displaying a Kerala lottery bumper poster on a desk",
    cta: { href: "/results", label: "Check Live Results" },
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-02%20at%2018.52.06_f972c04e.jpg-4lrhVMznsklpgKoSdo02odrBPnNrQb.jpeg",
    alt: "Person happily holding up a lottery ticket inside a shop",
    cta: { href: "/buy-ticket", label: "Buy Ticket Now" },
  },
]

export function ImageSlider() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [])
  const go = (i: number) => setIndex((i + slides.length) % slides.length)

  return (
    <section className="relative w-full">
      {/* Use taller 16:9 on small screens, ultra-wide 21:9 on md+ */}
      <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={
              "absolute inset-0 transition-opacity duration-700 " + (i === index ? "opacity-100" : "opacity-0")
            }
            aria-hidden={i !== index}
          >
            <Image
              src={s.src || "/placeholder.svg"}
              alt={s.alt}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 100vw"
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 to-white/0" />
            <div className="absolute bottom-4 left-1/2 z-[1] -translate-x-1/2 sm:bottom-5">
              <Link href={s.cta.href} className="btn btn-brand inline-flex items-center gap-2" aria-label={s.cta.label}>
                {s.cta.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Link>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
          className="absolute left-3 top-1/2 z-[2] -translate-y-1/2 rounded-full border bg-white/90 p-2 text-[#111827] shadow hover:bg-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(index + 1)}
          className="absolute right-3 top-1/2 z-[2] -translate-y-1/2 rounded-full border bg-white/90 p-2 text-[#111827] shadow hover:bg-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 z-[2] flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={"h-2 w-2 rounded-full " + (i === index ? "bg-[var(--brand)]" : "bg-gray-300")}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
