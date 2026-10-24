"use client"

import Link from "next/link"
import { Quote, Star, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { PageHeader } from "@/components/page-header"

export default function TestimonialsPage() {
  const { t } = useLanguage()

  return (
    <>
      <PageHeader eyebrow={t.nav.testimonials} title={t.testimonials.title} subtitle={t.testimonials.subtitle} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {t.testimonials.items.map((item) => (
            <figure key={item.name} className="flex flex-col rounded-md border border-border bg-card p-8">
              <Quote className="h-8 w-8 text-accent" />
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-pretty">{item.quote}</blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div className="font-serif text-lg font-semibold">{item.name}</div>
                <div className="text-sm text-muted-foreground">{item.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 rounded-md border border-border bg-secondary/40 p-10 text-center">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">{t.home.ctaTitle}</h2>
          <p className="max-w-lg text-muted-foreground">{t.home.ctaSubtitle}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t.home.ctaButton}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </section>
    </>
  )
}
