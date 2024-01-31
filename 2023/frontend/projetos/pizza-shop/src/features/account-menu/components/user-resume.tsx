import { Skeleton } from '@/components/ui/skeleton'

import { useProfileQuery } from '../hooks/use-profile-query'

function SkeletonView() {
  return (
    <div className="space-y-1.5">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-24" />
      <Skeleton />
    </div>
  )
}

export function UserResume() {
  const { data: profile, isLoading: isLoadingProfile } = useProfileQuery()

  if (isLoadingProfile) {
    return <SkeletonView />
  }

  return (
    <div className="flex flex-col">
      <span>{profile?.name}</span>
      <span className="text-xs font-normal text-muted-foreground">
        {profile?.email}
      </span>
    </div>
  )
}
