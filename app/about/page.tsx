"use client"

import Image from "next/image"
import Link from "next/link"
import { Hammer, ShieldCheck, Award, Wrench, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { PageHeader } from "@/components/page-header"

export default function AboutPage() {
  const { t } = useLanguage()
  const valueIcons = [Hammer, Award, ShieldCheck, Wrench]

  return (
    <>
      <PageHeader eyebrow={t.home.heroEyebrow} title={t.about.title} subtitle={t.about.subtitle} />

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-md border border-border">
            <Image src="/images/about-workshop.png" alt="Craftsman polishing a marble slab in the workshop" fill className="object-cover" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-balance md:text-4xl">{t.about.storyTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">{t.about.storyBody}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">{t.about.storyBody2}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              {t.nav.quote}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <h2 className="max-w-2xl font-serif text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {t.about.valuesTitle}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.values.map((value, i) => {
              const Icon = valueIcons[i % valueIcons.length]
              return (
                <div key={value.title} className="rounded-md border border-border bg-card p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-accent text-accent-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
