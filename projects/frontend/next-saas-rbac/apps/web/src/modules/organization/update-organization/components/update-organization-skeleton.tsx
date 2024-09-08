import { Skeleton } from '@/components/ui/skeleton'

export function UpdateOrganizationSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
