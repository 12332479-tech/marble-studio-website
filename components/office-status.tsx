"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

// Business hours: Mon–Sat, 8:00–18:00, based on the visitor's local clock.
function computeIsOpen(date: Date) {
  const day = date.getDay() // 0 = Sunday
  const hour = date.getHours()
  if (day === 0) return false
  return hour >= 8 && hour < 18
}

export function OfficeStatus() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    setIsOpen(computeIsOpen(new Date()))
    const id = setInterval(() => setIsOpen(computeIsOpen(new Date())), 60_000)
    return () => clearInterval(id)
  }, [])

  if (isOpen === null) return null

  return (
    <span
      className={cn(
        "mt-1 inline-flex w-fit items-center gap-1.5 rounded-sm px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        isOpen ? "bg-accent/15 text-accent" : "bg-secondary text-muted-foreground",
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", isOpen ? "bg-accent" : "bg-muted-foreground")} />
      {isOpen ? t.contact.openNow : t.contact.closedNow}
    </span>
  )
}
