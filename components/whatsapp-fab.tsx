"use client"

import { MessageCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { CONTACT } from "@/lib/assets"

export function WhatsappFab() {
  const { t } = useLanguage()

  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.contact.whatsapp}
      className="group fixed bottom-6 end-6 z-40 flex items-center gap-2 rounded-full bg-accent py-3 pe-4 ps-3 text-accent-foreground shadow-lg shadow-black/15 transition-all hover:pe-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-foreground/30" />
        <MessageCircle className="relative h-5 w-5" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100">
        {t.contact.whatsapp}
      </span>
    </a>
  )
}
