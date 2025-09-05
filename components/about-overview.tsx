import type { ContentData } from "@/lib/content"
import { getContentByKey } from "@/lib/content"

interface AboutOverviewProps {
  contentData?: ContentData
}

export function AboutOverview({ contentData }: AboutOverviewProps) {
  const aboutContent = contentData ? getContentByKey(contentData.sections, "about_overview") : null
  const howToPlayContent = contentData ? getContentByKey(contentData.sections, "how_to_play") : null

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 rounded-2xl bg-primary/5 ring-1 ring-primary/10 text-center">
      <div className="grid grid-rows-2 gap-10 place-items-center">
        <article className="mx-auto max-w-3xl">
          <h3 className="font-heading text-2xl font-extrabold text-foreground">
            {aboutContent?.title || "What is State Kerala Lottery?"}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {aboutContent?.content ||
              "Kerala State Lotteries is the first of its kind in India established in 1967. The lottery department runs multiple draws under Government supervision and supports welfare schemes from proceeds. Results are published daily and winners are verified and paid as per official guidelines."}
          </p>
          <ul className="mt-3 list-disc list-inside inline-block text-left text-sm text-muted-foreground">
            <li>Operated under the Government of Kerala</li>
            <li>Transparent draws and verified results</li>
            <li>Multiple weekly and bumper lotteries</li>
          </ul>
        </article>

        <article className="mx-auto max-w-3xl">
          <h3 className="font-heading text-2xl font-extrabold text-foreground">
            {howToPlayContent?.title || "How Is The Lottery Played?"}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {howToPlayContent?.content ||
              "Buy an official ticket, note the series and ticket number, and check results at the announced draw time. Winners submit valid ID and the original ticket as per Department norms to claim the prize."}
          </p>
          <ol className="mt-3 list-decimal list-inside inline-block text-left text-sm text-muted-foreground">
            <li>Choose your draw and purchase an authentic ticket</li>
            <li>Wait for the draw time (daily/weekly/bumper)</li>
            <li>Verify your number on the official result page</li>
          </ol>
        </article>
      </div>
    </section>
  )
}
