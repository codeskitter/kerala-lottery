import { type ContentData, getContentByKey } from "@/lib/content"

export function Hero({ contentData }: { contentData?: ContentData }) {
  const heroContent = contentData ? getContentByKey(contentData.sections, "hero") : null

  if (!heroContent) {
    return null
  }

  return (
    <section className="relative w-full bg-gradient-to-br from-blue-50 to-green-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            {heroContent.title}
          </h1>
          {heroContent.subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground">{heroContent.subtitle}</p>
          )}
          {heroContent.content && (
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {heroContent.content}
            </p>
          )}
          {heroContent.button_text && heroContent.button_url && (
            <div className="mt-8">
              <a href={heroContent.button_url} className="btn btn-brand btn-lg">
                {heroContent.button_text}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
