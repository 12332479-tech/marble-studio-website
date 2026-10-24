"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, X, FileText, Gem } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { buildSearchIndex, searchIndex, type SearchResult } from "@/lib/search-data"
import { cn } from "@/lib/utils"

export function SiteSearch() {
  const { t } = useLanguage()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const index = useMemo(() => buildSearchIndex(t), [t])
  const results = useMemo(() => searchIndex(index, query), [index, query])

  useEffect(() => setActiveIndex(0), [query])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      document.body.style.overflow = ""
      setQuery("")
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  function go(result: SearchResult) {
    router.push(result.href)
    setOpen(false)
  }

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && results[activeIndex]) {
      go(results[activeIndex])
    }
  }

  const pageResults = results.filter((r) => r.type === "page")
  const stoneResults = results.filter((r) => r.type === "stone")

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-sm border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary sm:inline-flex"
      >
        <Search className="h-4 w-4" />
        <span>{t.search.trigger}</span>
        <kbd className="ms-2 rounded-sm border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold">⌘K</kbd>
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.search.trigger}
        className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border sm:hidden"
      >
        <Search className="h-4 w-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 px-4 pt-24 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-xl overflow-hidden rounded-md border border-border bg-popover shadow-2xl animate-in fade-in-0 zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder={t.search.placeholder}
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {query && results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">{t.search.noResults}</p>
              )}

              {pageResults.length > 0 && (
                <div className="mb-1">
                  <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{t.search.pages}</p>
                  {pageResults.map((r) => {
                    const globalIdx = results.indexOf(r)
                    return (
                      <button
                        key={r.href + r.title}
                        type="button"
                        onClick={() => go(r)}
                        onMouseEnter={() => setActiveIndex(globalIdx)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-start text-sm transition-colors",
                          activeIndex === globalIdx ? "bg-accent text-accent-foreground" : "hover:bg-secondary",
                        )}
                      >
                        <FileText className="h-4 w-4 shrink-0 opacity-70" />
                        <span className="font-medium">{r.title}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {stoneResults.length > 0 && (
                <div>
                  <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{t.search.stones}</p>
                  {stoneResults.map((r) => {
                    const globalIdx = results.indexOf(r)
                    return (
                      <button
                        key={r.href + r.title}
                        type="button"
                        onClick={() => go(r)}
                        onMouseEnter={() => setActiveIndex(globalIdx)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-start text-sm transition-colors",
                          activeIndex === globalIdx ? "bg-accent text-accent-foreground" : "hover:bg-secondary",
                        )}
                      >
                        <Gem className="h-4 w-4 shrink-0 opacity-70" />
                        <span className="font-medium">{r.title}</span>
                        <span className="ms-auto text-xs opacity-60">{r.subtitle}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="hidden items-center gap-4 border-t border-border px-4 py-2 text-[11px] text-muted-foreground sm:flex">
              <span><kbd className="rounded-sm border border-border px-1">↑↓</kbd> navigate</span>
              <span><kbd className="rounded-sm border border-border px-1">↵</kbd> select</span>
              <span><kbd className="rounded-sm border border-border px-1">esc</kbd> {t.search.hint}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
