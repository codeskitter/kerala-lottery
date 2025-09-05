"use client"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function WhyChoose() {
  const { data: sections } = useSWR("/api/admin/content/sections", fetcher)

  const sectionsArray = Array.isArray(sections) ? sections : []
  const whyChooseSection = sectionsArray.find((s: any) => s.section_key === "why_choose")

  let benefits = []
  try {
    benefits = whyChooseSection?.content ? JSON.parse(whyChooseSection.content) : []
    if (!Array.isArray(benefits)) benefits = []
  } catch (error) {
    console.error("Failed to parse benefits content:", error)
    benefits = []
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
          Why Choose <span className="text-brand">Us</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {whyChooseSection?.subtitle ||
            "Trusted by millions across Kerala for secure and transparent lottery experience."}
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.length > 0 ? (
          benefits.map((benefit: any, index: number) => (
            <div key={index} className="card p-6 text-center">
              <h3 className="font-heading text-lg font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{benefit.desc}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">Loading benefits...</div>
        )}
      </div>
    </section>
  )
}
