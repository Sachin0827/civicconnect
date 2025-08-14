import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://civicconnect.vercel.app'),
  title: 'CivicConnect - Community Problem Solving',
  description: 'Connect your community, report issues, and make your voice heard. A platform for civic engagement and community problem-solving.',
  keywords: 'civic engagement, community issues, problem solving, local government, community reporting',
  authors: [{ name: 'CivicConnect Team' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'CivicConnect - Community Problem Solving',
    description: 'Connect your community, report issues, and make your voice heard.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CivicConnect - Community Problem Solving',
    description: 'Connect your community, report issues, and make your voice heard.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
