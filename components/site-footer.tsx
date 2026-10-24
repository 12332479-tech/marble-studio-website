"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, MessageCircle, Share2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { CONTACT } from "@/lib/assets"

export function SiteFooter() {
  const { t } = useLanguage()

  const links = [
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/products", label: t.nav.products },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/faq", label: t.nav.faq },
    { href: "/contact", label: t.nav.contact },
  ]

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary text-primary-foreground font-serif text-xl leading-none">
              E
            </span>
            <span className="font-serif text-lg font-semibold">{t.brand}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={CONTACT.whatsapp}
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-border transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Social media"
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-border transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Share2 className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg font-semibold">{t.footer.quickLinks}</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg font-semibold">{t.footer.contact}</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-accent" />
              <a href={CONTACT.phoneHref} className="transition-colors hover:text-foreground" dir="ltr">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-foreground">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{t.contact.addressValue}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} {t.brand}. {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
