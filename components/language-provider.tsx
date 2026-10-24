"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { dictionary, type Dictionary, type Language } from "@/lib/i18n/dictionary"

type LanguageContextValue = {
  lang: Language
  dir: "ltr" | "rtl"
  t: Dictionary
  setLang: (lang: Language) => void
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en")

  useEffect(() => {
    const stored = window.localStorage.getItem("eva-lang") as Language | null
    if (stored === "en" || stored === "ar") setLangState(stored)
  }, [])

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr"
    document.documentElement.setAttribute("lang", lang)
    document.documentElement.setAttribute("dir", dir)
  }, [lang])

  const setLang = useCallback((next: Language) => {
    setLangState(next)
    window.localStorage.setItem("eva-lang", next)
  }, [])

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "en" ? "ar" : "en"
      window.localStorage.setItem("eva-lang", next)
      return next
    })
  }, [])

  const value: LanguageContextValue = {
    lang,
    dir: lang === "ar" ? "rtl" : "ltr",
    t: dictionary[lang],
    setLang,
    toggle,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
