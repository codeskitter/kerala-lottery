"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function ImageSlider() {
  const { data: carouselImages } = useSWR("/api/admin/content/carousel", fetcher)

  const slides = Array.isArray(carouselImages) ? carouselImages.filter((img: any) => img.is_active) : []

  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length === 0) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [slides.length])

  const go = (i: number) => setIndex((i + slides.length) % slides.length)

  if (slides.length === 0) {
    return (
      <section className="relative w-full">
        <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9] bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">Loading carousel images...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full">
      <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
        {slides.map((slide: any, i: number) => (
          <div
            key={slide.id}
            className={
              "absolute inset-0 transition-opacity duration-700 " + (i === index ? "opacity-100" : "opacity-0")
            }
            aria-hidden={i !== index}
          >
            <Image
              src={slide.image_url || "/placeholder.svg"}
              alt={slide.alt_text || `Slide ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 100vw"
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 to-white/0" />
            {slide.cta_text && slide.cta_link && (
              <div className="absolute bottom-4 left-1/2 z-[1] -translate-x-1/2 sm:bottom-5">
                <Link
                  href={slide.cta_link}
                  className="rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white hover:bg-brand/90"
                >
                  {slide.cta_text}
                </Link>
              </div>
            )}
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
          {slides.map((_: any, i: number) => (
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
