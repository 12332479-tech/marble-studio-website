"use client"

import { useEffect, useRef, useState } from "react"

// Parses "3,500+" into { prefix: "", target: 3500, suffix: "+" } and animates
// from 0 to target once the element scrolls into view.
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(() => value.replace(/[0-9,]/g, (m) => (m === "," ? "," : "0")))

  useEffect(() => {
    const match = value.match(/^([^\d]*)([\d,]+)(.*)$/)
    if (!match) {
      setDisplay(value)
      return
    }
    const [, prefix, numStr, suffix] = match
    const target = Number.parseInt(numStr.replace(/,/g, ""), 10)
    const node = ref.current
    if (!node) return

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const duration = 1400
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = Math.round(target * eased)
          setDisplay(`${prefix}${current.toLocaleString()}${suffix}`)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
