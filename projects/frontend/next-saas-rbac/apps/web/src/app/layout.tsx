import './globals.css'

import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Toaster position="top-right" richColors duration={2000} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
