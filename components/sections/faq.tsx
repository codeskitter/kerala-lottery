"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function FAQ() {
  const { data: faqs } = useSWR("/api/admin/content/faqs", fetcher)

  const faqArray = Array.isArray(faqs) ? faqs : []

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
          Frequently Asked <span className="text-brand">Questions</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">Get answers to common questions about our lottery system.</p>
      </div>

      <div className="mt-8">
        {faqArray && faqArray.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {faqArray
              .filter((faq: any) => faq.is_active)
              .map((faq: any) => (
                <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        ) : (
          <div className="text-center text-muted-foreground">Loading frequently asked questions...</div>
        )}
      </div>
    </section>
  )
}
