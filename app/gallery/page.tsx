"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { PageHeader } from "@/components/page-header"
import { galleryImages } from "@/lib/assets"

export default function GalleryPage() {
  const { t } = useLanguage()
  const [active, setActive] = useState<number | null>(null)
  const captions = t.gallery.captions as Record<string, string>

  return (
    <>
      <PageHeader eyebrow={t.nav.gallery} title={t.gallery.title} subtitle={t.gallery.subtitle} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, i) => (
            <button
              key={image.key}
              type="button"
              onClick={() => setActive(i)}
              className="group relative aspect-4/3 overflow-hidden rounded-md border border-border"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={captions[image.key] ?? image.key}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4 text-start text-sm font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                {captions[image.key]}
              </span>
            </button>
          ))}
        </div>
      </section>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-4 backdrop-blur"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute end-4 top-4 flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-background"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative aspect-4/3 w-full max-w-4xl overflow-hidden rounded-md" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryImages[active].src || "/placeholder.svg"}
              alt={captions[galleryImages[active].key] ?? ""}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
