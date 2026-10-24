"use client"

import Link from "next/link"
import { ArrowRight, Ruler, LayoutGrid, Layers, Wrench, Hammer, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { PageHeader } from "@/components/page-header"

export default function ServicesPage() {
  const { t } = useLanguage()
  const icons = [Ruler, LayoutGrid, Layers, Wrench, Hammer, Sparkles]

  return (
    <>
      <PageHeader eyebrow={t.nav.services} title={t.services.title} subtitle={t.services.subtitle} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div key={service.title} className="group flex flex-col rounded-md border border-border bg-card p-8 transition-colors hover:border-accent">
                <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <h2 className="mt-6 font-serif text-2xl font-semibold">{service.title}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{service.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 md:flex-row md:justify-between md:text-start lg:px-8">
          <div>
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">{t.home.ctaTitle}</h2>
            <p className="mt-2 text-primary-foreground/70">{t.home.ctaSubtitle}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t.home.ctaButton}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </section>
    </>
  )
}
