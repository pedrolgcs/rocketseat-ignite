import { SlashIcon } from 'lucide-react'

import { ability } from '@/features/authenticate'

import { OrganizationSwitcher } from './organization-switcher'
import { ProjectSwitcher } from './project-switcher'

export async function SelectProject() {
  const permissions = await ability()

  return (
    <div className="flex items-center gap-2">
      <OrganizationSwitcher />

      {permissions?.can('get', 'Project') && (
        <>
          <SlashIcon className="size-3 -rotate-[24deg] text-border" />
          <ProjectSwitcher />
        </>
      )}

      {permissions?.cannot('get', 'Project') && (
        <p className="text-sm font-medium text-muted-foreground">
          You don't have permission to select a project
        </p>
      )}
    </div>
  )
}
