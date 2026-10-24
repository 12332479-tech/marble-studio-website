import { Reveal } from "@/components/reveal"

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <Reveal className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        )}
        <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">{subtitle}</p>}
      </Reveal>
    </section>
  )
}
