"use client"

import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { PageHeader } from "@/components/page-header"
import { QuoteForm } from "@/components/quote-form"
import { OfficeStatus } from "@/components/office-status"
import { WhatsappFab } from "@/components/whatsapp-fab"
import { CONTACT } from "@/lib/assets"

export default function ContactPage() {
  const { t } = useLanguage()

  const details = [
    { icon: Phone, label: t.contact.phone, value: CONTACT.phone, href: CONTACT.phoneHref, ltr: true },
    { icon: Mail, label: t.contact.email, value: CONTACT.email, href: `mailto:${CONTACT.email}`, ltr: true },
    { icon: MapPin, label: t.contact.address, value: t.contact.addressValue },
    { icon: Clock, label: t.contact.hours, value: t.contact.hoursValue, showStatus: true },
  ]

  return (
    <>
      <PageHeader eyebrow={t.nav.contact} title={t.contact.title} subtitle={t.contact.subtitle} />
      <WhatsappFab />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Contact details */}
          <div>
            <h2 className="font-serif text-2xl font-semibold">{t.contact.infoTitle}</h2>
            <ul className="mt-6 flex flex-col gap-5">
              {details.map((d) => {
                const Icon = d.icon
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-secondary text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{d.label}</span>
                      <span className="mt-0.5 text-sm" dir={d.ltr ? "ltr" : undefined}>
                        {d.value}
                      </span>
                      {d.showStatus && <OfficeStatus />}
                    </span>
                  </>
                )
                return (
                  <li key={d.label}>
                    {d.href ? (
                      <a href={d.href} className="flex items-center gap-4 transition-opacity hover:opacity-80">
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>

            <a
              href={CONTACT.whatsapp}
              className="mt-8 inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <MessageCircle className="h-4 w-4 text-accent" />
              {t.contact.whatsapp}
            </a>

            <div className="mt-8 overflow-hidden rounded-md border border-border">
              <iframe
                title="Eva Granite & Marbles location"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${CONTACT.lng - 0.006}%2C${CONTACT.lat - 0.004}%2C${CONTACT.lng + 0.006}%2C${CONTACT.lat + 0.004}&layer=mapnik&marker=${CONTACT.lat}%2C${CONTACT.lng}`}
                className="h-64 w-full"
                loading="lazy"
              />
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-t border-border bg-secondary/60 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-accent transition-colors hover:bg-secondary"
              >
                <MapPin className="h-3.5 w-3.5" />
                {t.contact.directions}
              </a>
            </div>
          </div>

          {/* Quote form */}
          <div className="rounded-md border border-border bg-card p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-semibold">{t.contact.formTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.contact.subtitle}</p>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
          {t.contact.trust.map((item) => (
            <div key={item.label} className="text-center sm:text-start">
              <div className="font-serif text-3xl font-semibold text-accent">{item.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
