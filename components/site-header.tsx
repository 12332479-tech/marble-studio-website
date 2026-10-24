"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { SiteSearch } from "@/components/site-search"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const { t, lang, toggle } = useLanguage()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/products", label: t.nav.products },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/testimonials", label: t.nav.testimonials },
    { href: "/faq", label: t.nav.faq },
    { href: "/contact", label: t.nav.contact },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary text-primary-foreground font-serif text-xl leading-none">
            E
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-tight">{t.brand}</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Est. 1980</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SiteSearch />
          <ThemeToggle />
          <button
            type="button"
            onClick={toggle}
            className="rounded-sm border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            aria-label={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
          >
            {lang === "en" ? "العربية" : "EN"}
          </button>
          <Link
            href="/contact"
            className="hidden rounded-sm bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            {t.nav.quote}
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-sm border border-border p-2 xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-sm px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                  pathname === link.href && "text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-sm bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-foreground"
            >
              {t.nav.quote}
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
