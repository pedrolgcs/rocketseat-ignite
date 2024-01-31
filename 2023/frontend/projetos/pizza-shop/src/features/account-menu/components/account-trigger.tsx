import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

import { useManagedRestaurantQuery } from '../hooks/use-managed-restaurant-query'

function SkeletonView() {
  return <Skeleton className="h-4 w-40" />
}

export function AccountTrigger() {
  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useManagedRestaurantQuery()

  if (isLoadingManagedRestaurant) {
    return <SkeletonView />
  }

  return (
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        className={cn('group flex select-none items-center gap-2')}
      >
        {managedRestaurant?.name}
        <ChevronDown
          className={cn('transition', 'group-data-[state=open]:-rotate-180')}
        />
      </Button>
    </DropdownMenuTrigger>
  )
}
