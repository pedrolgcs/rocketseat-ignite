'use client'

import { useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components'
import { cn } from '@/lib/tw-merge'

export default function Loading() {
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold"> {query} </span>
      </p>

      <div className={cn('flex flex-col gap-6', 'lg:grid lg:grid-cols-3')}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className={cn('flex h-72', 'lg:h-80')} />
        ))}
      </div>
    </div>
  )
}
