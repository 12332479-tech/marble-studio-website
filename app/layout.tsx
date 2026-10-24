import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { LanguageProvider } from '@/components/language-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { ScrollProgress } from '@/components/scroll-progress'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Eva Granite & Marbles | Premium Marble & Granite in Lebanon',
  description:
    'Eva Granite & Marbles supplies, fabricates, and installs premium marble and granite across Lebanon. 45 years of craftsmanship in countertops, flooring, wall cladding, and custom stonework.',
  keywords: [
    'marble supplier',
    'granite countertop installer',
    'stone fabrication',
    'kitchen countertops',
    'natural stone company',
    'marble Lebanon',
    'granite Lebanon',
  ],
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5f0' },
    { media: '(prefers-color-scheme: dark)', color: '#1b1a17' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          // Set the dark/light class before hydration to avoid a flash of
          // the wrong theme. Kept in sync with components/theme-provider.tsx.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('eva-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <LanguageProvider>
            <ScrollProgress />
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
