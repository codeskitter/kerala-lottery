import { cn } from "@/lib/utils"

type PageHeaderProps = {
  title: string
  highlight?: string
  subtitle?: string
  className?: string
}

export function PageHeader({ title, highlight, subtitle, className }: PageHeaderProps) {
  return (
    <section
      className={cn("w-full bg-gradient-to-b from-amber-50 to-transparent", "py-12 md:py-16", className)}
      aria-label="page header"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-balance">
          {title} {highlight ? <span className="text-amber-500">{highlight}</span> : null}
        </h1>
        {subtitle ? <p className="mt-4 text-muted-foreground max-w-2xl">{subtitle}</p> : null}
      </div>
    </section>
  )
}
