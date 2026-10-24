"use client"

import { useMemo, useState } from "react"
import { Check } from "lucide-react"
import { stones } from "@/lib/products-data"
import { getStoneImage } from "@/lib/assets"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

// A curated spread across categories so the picker shows real variety
// without listing all 100 stones inline on the contact page.
const FEATURED_NAMES = [
  "Calacatta Gold",
  "Carrara White",
  "Nero Marquina",
  "Statuario",
  "Emperador Dark",
  "Crema Marfil",
  "Absolute Black",
  "Tan Brown",
  "Kashmir White",
  "Ubatuba",
  "Botticino",
  "Verde Alpi",
]

export function StonePicker({ name = "stone" }: { name?: string }) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<string>("")

  const featured = useMemo(
    () => FEATURED_NAMES.map((n) => stones.find((s) => s.name === n)).filter((s): s is NonNullable<typeof s> => Boolean(s)),
    [],
  )

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{t.contact.stoneLabel}</span>
      <input type="hidden" name={name} value={selected} />
      <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-6">
        {featured.map((stone) => {
          const isSelected = selected === stone.name
          return (
            <button
              key={stone.name}
              type="button"
              onClick={() => setSelected(isSelected ? "" : stone.name)}
              aria-pressed={isSelected}
              title={stone.name}
              className="group flex flex-col items-center gap-1.5 focus-visible:outline-none"
            >
              <span
                className={cn(
                  "relative block h-12 w-12 overflow-hidden rounded-sm ring-1 ring-border transition-all",
                  "group-focus-visible:ring-2 group-focus-visible:ring-accent",
                  isSelected && "ring-2 ring-accent ring-offset-2 ring-offset-card",
                )}
              >
                <img
                  src={getStoneImage(stone.name) || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {isSelected && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </span>
                )}
              </span>
              <span
                className={cn(
                  "line-clamp-1 max-w-[4.5rem] text-center text-[10.5px] leading-tight text-muted-foreground transition-colors",
                  isSelected && "font-semibold text-foreground",
                )}
              >
                {stone.name}
              </span>
            </button>
          )
        })}
      </div>
      {selected && (
        <button
          type="button"
          onClick={() => setSelected("")}
          className="self-start text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          {t.contact.stoneNone}
        </button>
      )}
    </div>
  )
}
