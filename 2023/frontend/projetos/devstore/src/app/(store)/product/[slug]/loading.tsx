import { Skeleton } from '@/components'
import { cn } from '@/lib/tw-merge'

export default function Loading() {
  return (
    <div
      className={cn(
        'relative flex flex-col gap-y-3',
        'lg:grid lg:grid-cols-3 lg:gap-x-3',
      )}
    >
      <Skeleton className={cn('h-[20rem]', 'lg:col-span-2 lg:h-[88vh]')} />

      <Skeleton className={cn('h-[29rem]', 'lg:h-[88vh]')} />
    </div>
  )
}
