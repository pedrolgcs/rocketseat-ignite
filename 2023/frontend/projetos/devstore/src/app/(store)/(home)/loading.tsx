import { Skeleton } from '@/components'
import { cn } from '@/lib/tw-merge'

export default function Loading() {
  return (
    <div
      className={cn(
        'grid grid-cols-1 grid-rows-1 gap-y-6',
        'lg:grid-cols-9 lg:grid-rows-6 lg:gap-6',
      )}
    >
      <Skeleton
        className={cn(
          'flex h-[28rem]',
          'lg:col-span-6 lg:row-span-6 lg:h-[90vh]',
        )}
      />

      {Array.from({ length: 2 }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            'flex h-[28rem]',
            'lg:col-span-3 lg:row-span-3 lg:h-full',
          )}
        />
      ))}
    </div>
  )
}
