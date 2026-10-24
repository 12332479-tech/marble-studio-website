"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { PageHeader } from "@/components/page-header"
import { cn } from "@/lib/utils"

export default function FaqPage() {
  const { t } = useLanguage()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <>
      <PageHeader eyebrow={t.nav.faq} title={t.faq.title} subtitle={t.faq.subtitle} />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="divide-y divide-border rounded-md border border-border bg-card">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg font-semibold">{item.q}</span>
                  <ChevronDown className={cn("h-5 w-5 shrink-0 text-accent transition-transform", isOpen && "rotate-180")} />
                </button>
                {isOpen && <p className="px-6 pb-6 leading-relaxed text-muted-foreground">{item.a}</p>}
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">{t.contact.subtitle}</p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-sm bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t.nav.contact}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </section>
    </>
  )
}
