import type { Metadata, Viewport } from 'next'
import { Fraunces, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { company } from '@/lib/site'
import './globals.css'

const sans = Outfit({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Fraunces({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'GPRO Sp. z o.o. — rośliny ozdobne',
    template: '%s · GPRO',
  },
  description: company.lead,
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6f4ee',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    telephone: '+48602695400',
    email: company.email,
    taxID: company.nip,
    image: '/logo-gpro.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.street,
      postalCode: '32-080',
      addressLocality: 'Brzezie',
      addressCountry: 'PL',
    },
  }

  return (
    <html lang="pl" className={`${sans.variable} ${serif.variable}`} data-scroll-behavior="smooth">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SiteHeader />
        <main id="tresc">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' ? <Analytics /> : null}
      </body>
    </html>
  )
}
