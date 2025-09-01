"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "How do I purchase a lottery ticket?",
    a: "Buy securely online via UPI, cards, or net banking from the Buy Ticket page.",
  },
  {
    q: "When are the lottery draws conducted?",
    a: "Daily draws are typically held at 3:00 PM with notifications sent instantly.",
  },
  {
    q: "How do I claim my prize if I win?",
    a: "Winners are contacted by our team with verified instructions and documentation.",
  },
  {
    q: "Are the lottery results transparent?",
    a: "Results are published publicly and draws are audited for fairness.",
  },
  {
    q: "What is the validity period of a lottery ticket?",
    a: "Please refer to the ticket terms; generally, claims must be made within 30 days.",
  },
]

export function FAQ() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h3 className="font-heading text-center text-3xl sm:text-4xl font-extrabold">
        Frequently Asked <span className="text-brand">Questions</span>
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
        Find answers to common questions about our lottery system.
      </p>
      <div className="mx-auto mt-8 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-b">
              <AccordionTrigger className="text-left text-[#111827]">{f.q}</AccordionTrigger>
              <AccordionContent className="text-[#4b5563]">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
