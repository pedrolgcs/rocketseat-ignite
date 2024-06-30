import { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { ability } from '@/features/authenticate'

import {
  OrganizationSelect,
  OrganizationSelectSkeleton,
} from './organization-select'

export function SelectProjectSkeleton() {
  return <Skeleton className="h-5 w-36" />
}

export async function SelectProject() {
  const permissions = await ability()

  return (
    <div className="flex items-center gap-2">
      <Suspense fallback={<OrganizationSelectSkeleton />}>
        <OrganizationSelect />
      </Suspense>

      {permissions?.can('get', 'Project') && <p>Pode selecionar</p>}

      {permissions?.cannot('get', 'Project') && (
        <p className="text-sm font-medium text-muted-foreground">
          You don't have permission to select a project
        </p>
      )}
    </div>
  )
}
