import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { env } from '@/env'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    template: '%s | devstore',
    default: 'devstore',
  },
  metadataBase: new URL(env.APP_URL),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-zinc-950 text-zinc-50 antialiased">{children}</body>
    </html>
  )
}
