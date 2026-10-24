"use client"

import { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Box, Search, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { PageHeader } from "@/components/page-header"
import { stones, stoneCategories, type Stone } from "@/lib/products-data"
import { getStoneImage } from "@/lib/assets"
import { cn } from "@/lib/utils"

const StoneViewer3D = dynamic(
  () => import("@/components/stone-viewer-3d").then((m) => m.StoneViewer3D),
  { ssr: false },
)

// A generated texture photo for the stone, rendered from its actual
// colorway (base + vein) and category-specific pattern (veining, speckle,
// banding, etc). Falls back to a pure CSS swatch if the image is missing.
function StoneSwatch({ stone }: { stone: Stone }) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div
      className="relative aspect-square w-full overflow-hidden"
      style={{ backgroundColor: stone.base }}
      aria-hidden="true"
    >
      {!imageFailed && (
        <Image
          src={getStoneImage(stone.name)}
          alt=""
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
          onError={() => setImageFailed(true)}
        />
      )}
      {imageFailed && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              `radial-gradient(circle at 22% 28%, ${stone.vein}66, transparent 42%)`,
              `radial-gradient(circle at 78% 68%, ${stone.vein}44, transparent 46%)`,
              `radial-gradient(circle at 55% 12%, ${stone.vein}33, transparent 38%)`,
              `linear-gradient(122deg, transparent 30%, ${stone.vein}2e 46%, transparent 54%)`,
              `linear-gradient(28deg, transparent 62%, ${stone.vein}22 72%, transparent 80%)`,
            ].join(","),
          }}
        />
      )}
    </div>
  )
}

export default function ProductsPage() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<string>("all")
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Stone | null>(null)

  // Lock body scroll while the 3D modal is open, and close on Escape.
  useEffect(() => {
    if (!selected) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [selected])

  const categoryLabel = (cat: Stone["category"]) => t.products.categories[cat]
  const countryLabel = (code: string) =>
    (t.products.countries as Record<string, string>)[code] ?? code

  const filters = [
    { key: "all", label: t.products.filterAll },
    ...stoneCategories.map((cat) => ({ key: cat, label: categoryLabel(cat) })),
  ]

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return stones.filter((stone) => {
      const matchesCategory = filter === "all" || stone.category === filter
      if (!matchesCategory) return false
      if (!q) return true
      return (
        stone.name.toLowerCase().includes(q) ||
        categoryLabel(stone.category).toLowerCase().includes(q) ||
        countryLabel(stone.origin).toLowerCase().includes(q)
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, query, t])

  const countLabel = results.length === 1 ? t.products.resultsSingular : t.products.resultsPlural

  return (
    <>
      <PageHeader eyebrow={t.nav.products} title={t.products.catalogTitle} subtitle={t.products.catalogSubtitle} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={cn(
                  "rounded-sm border px-4 py-2 text-sm font-medium transition-colors",
                  filter === f.key
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground rtl:left-auto rtl:right-3" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.products.searchPlaceholder}
              aria-label={t.products.searchPlaceholder}
              className="w-full rounded-sm border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent rtl:pl-3 rtl:pr-9"
            />
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{results.length}</span> {countLabel}
        </p>

        {results.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">{t.products.noResults}</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((stone) => (
              <div
                key={stone.name}
                className="group overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-accent/60"
              >
                <button
                  type="button"
                  onClick={() => setSelected(stone)}
                  aria-label={`${t.products.view3d}: ${stone.name}`}
                  className="relative block w-full cursor-pointer overflow-hidden"
                >
                  <div className="transition-transform duration-500 group-hover:scale-105">
                    <StoneSwatch stone={stone} />
                  </div>
                  <span className="absolute left-3 top-3 rounded-sm bg-background/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent backdrop-blur-sm rtl:left-auto rtl:right-3">
                    {categoryLabel(stone.category)}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center bg-background/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-sm border border-accent bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground">
                      <Box className="h-4 w-4" />
                      {t.products.view3d}
                    </span>
                  </span>
                </button>
                <div className="p-5">
                  <h2 className="font-serif text-xl font-semibold leading-tight text-pretty">{stone.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.products.originLabel}: {countryLabel(stone.origin)}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                  >
                    {t.nav.quote}
                    <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.name}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
          <div
            className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border p-5">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                  {categoryLabel(selected.category)}
                </span>
                <h2 className="mt-1 font-serif text-2xl font-semibold leading-tight text-pretty">{selected.name}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t.products.originLabel}: {countryLabel(selected.origin)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label={t.products.close}
                className="rounded-sm border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="h-[360px] w-full sm:h-[440px]">
              <StoneViewer3D stone={selected} />
            </div>

            <div className="flex flex-col items-center gap-3 border-t border-border p-4 sm:flex-row sm:justify-between">
              <p className="text-xs text-muted-foreground">{t.products.viewerHint}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                {t.nav.quote}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
