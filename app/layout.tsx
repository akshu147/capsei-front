import type React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'
import AppProvider from '@/components/Provider'

const _inter = Inter({ subsets: ['latin'] })
const _spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Capsei - Multi-Service Mobility & Logistics Platform',
  icons: {
    icon: '/capsei.png',
  },
  description:
    'Book bike taxis, car rides, loading vehicles, and send parcels nationwide. Fast, reliable, and enterprise-grade logistics solutions.',
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AppProvider>{children}</AppProvider>

        {/* ✅ Google Maps Places API */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
          strategy="afterInteractive"
        />

        <Analytics />
      </body>
    </html>
  )
}
