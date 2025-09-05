"use client"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function HowItWorks() {
  const { data: sections } = useSWR("/api/admin/content/sections", fetcher)

  const sectionsArray = Array.isArray(sections) ? sections : []
  const howItWorksSection = sectionsArray.find((s: any) => s.section_key === "how_it_works")

  let steps = []
  try {
    steps = howItWorksSection?.content ? JSON.parse(howItWorksSection.content) : []
    if (!Array.isArray(steps)) steps = []
  } catch (error) {
    console.error("Failed to parse steps content:", error)
    steps = []
  }

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <h2 id="how-title" className="font-heading text-3xl font-extrabold sm:text-4xl">
          How <span className="text-brand">It Works</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {howItWorksSection?.subtitle || "From registration to results in four simple steps."}
        </p>
      </div>

      <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.length > 0 ? (
          steps.map((step: any, i: number) => (
            <li key={i} className="card p-5">
              <div className="label">Step {i + 1}</div>
              <h3 className="mt-1 font-heading text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
            </li>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">Loading steps...</div>
        )}
      </ol>
    </section>
  )
}
