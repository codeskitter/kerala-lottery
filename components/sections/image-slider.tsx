"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

const slides = [
  {
    src: "/images/slider/1.jpeg",
    alt: "Kerala lottery ticket - orange theme",
    cta: { href: "/buy-ticket", label: "Buy Ticket Now" },
  },
  {
    src: "/images/slider/2.jpeg",
    alt: "Kerala lottery ticket - Akshaya green",
    cta: { href: "/buy-ticket", label: "Buy Ticket Now" },
  },
  {
    src: "/images/slider/3.jpeg",
    alt: "Kerala lottery ticket - WinWin orange",
    cta: { href: "/buy-ticket", label: "Buy Ticket Now" },
  },
  {
    src: "/images/slider/4.jpeg",
    alt: "Kerala lottery ticket - Nirmal blue",
    cta: { href: "/results", label: "Check Live Results" },
  },
  {
    src: "/images/slider/5.jpeg",
    alt: "Kerala lottery ticket - Nirmal variant",
    cta: { href: "/buy-ticket", label: "Buy Ticket" },
  },
  {
    src: "/images/slider/6.jpeg",
    alt: "Kerala lottery ticket - Karunya purple",
    cta: { href: "/buy-ticket", label: "Buy Ticket Now" },
  },
  {
    src: "/images/slider/7.jpeg",
    alt: "Kerala lotteries event photo",
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
