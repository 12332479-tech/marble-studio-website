"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Hammer, LayoutGrid, Layers, Wrench, Ruler, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { productImages } from "@/lib/assets"
import { Reveal } from "@/components/reveal"
import { CountUp } from "@/components/count-up"

export default function HomePage() {
  const { t, dir } = useLanguage()

  const serviceIcons = [Ruler, LayoutGrid, Layers, Wrench, Hammer, Sparkles]
  const Arrow = dir === "rtl" ? ArrowRight : ArrowRight

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-marble.png"
            alt="Luxury kitchen with a white marble island"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-28 sm:px-6 md:py-40 lg:px-8">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">{t.home.heroEyebrow}</p>
            <h1 className="max-w-2xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-7xl">
              {t.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">{t.home.heroSubtitle}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                {t.home.heroCta}
                <Arrow className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-sm border border-border bg-background/60 px-6 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-secondary"
              >
                {t.home.heroSecondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { value: "45+", label: t.home.statsExperience },
            { value: "3,500+", label: t.home.statsProjects },
            { value: "120+", label: t.home.statsStone },
            { value: "2,000+", label: t.home.statsClients },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="text-center">
              <CountUp value={stat.value} className="font-serif text-4xl font-semibold text-accent md:text-5xl" />
              <div className="mt-2 text-sm text-primary-foreground/70">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured services */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {t.home.featuredTitle}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground text-pretty">{t.home.featuredSubtitle}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, i) => {
            const Icon = serviceIcons[i % serviceIcons.length]
            return (
              <Reveal
                key={service.title}
                delay={(i % 3) * 90}
                className="group rounded-md border border-border bg-card p-7 transition-colors hover:border-accent"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
              </Reveal>
            )
          })}
        </div>
        <div className="mt-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
            {t.nav.services}
            <Arrow className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </section>

      {/* Product preview */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                {t.home.productsTitle}
              </h2>
              <p className="mt-3 text-lg text-muted-foreground text-pretty">{t.home.productsSubtitle}</p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              {t.home.productsCta}
              <Arrow className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.products.items.slice(0, 3).map((product, i) => (
              <Reveal key={product.name} delay={i * 90} as="div">
                <Link href="/products" className="group block overflow-hidden rounded-md border border-border bg-card">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={productImages[i] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">{product.type}</span>
                    <h3 className="mt-1 font-serif text-xl font-semibold">{product.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{product.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <Reveal className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold tracking-tight text-balance md:text-5xl">
            {t.home.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70 text-pretty">{t.home.ctaSubtitle}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t.home.ctaButton}
            <Arrow className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </Reveal>
      </section>
    </>
  )
}
