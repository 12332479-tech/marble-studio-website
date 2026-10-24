import type { Dictionary } from "@/lib/i18n/dictionary"
import { stones } from "@/lib/products-data"

export type SearchResult = {
  type: "page" | "stone"
  title: string
  subtitle: string
  href: string
}

export function buildSearchIndex(t: Dictionary): SearchResult[] {
  const pages: SearchResult[] = [
    { type: "page", title: t.nav.home, subtitle: t.brand, href: "/" },
    { type: "page", title: t.nav.about, subtitle: t.brand, href: "/about" },
    { type: "page", title: t.nav.services, subtitle: t.brand, href: "/services" },
    { type: "page", title: t.nav.products, subtitle: t.brand, href: "/products" },
    { type: "page", title: t.nav.gallery, subtitle: t.brand, href: "/gallery" },
    { type: "page", title: t.nav.testimonials, subtitle: t.brand, href: "/testimonials" },
    { type: "page", title: t.nav.faq, subtitle: t.brand, href: "/faq" },
    { type: "page", title: t.nav.contact, subtitle: t.brand, href: "/contact" },
  ]

  const stoneResults: SearchResult[] = stones.map((s) => ({
    type: "stone",
    title: s.name,
    subtitle: s.category[0].toUpperCase() + s.category.slice(1),
    href: "/products",
  }))

  return [...pages, ...stoneResults]
}

export function searchIndex(index: SearchResult[], query: string, limit = 8): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return index.filter((item) => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)).slice(0, limit)
}
