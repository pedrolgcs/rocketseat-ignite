import './globals.css'

import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Create Next App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Toaster position="top-right" richColors duration={2000} />
        {children}
      </body>
    </html>
  )
}
