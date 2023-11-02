import * as React from 'react'
import { Header } from '@/components'
import { cn } from '@/lib/tw-merge'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'mx-auto flex min-h-screen w-full flex-col gap-5 p-5',
        'lg:max-w-[1600px] lg:p-8',
      )}
    >
      <Header />
      {children}
    </div>
  )
}
