import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ProjectsList } from '@/modules/organization/projects-list'
import { ability } from '@/modules/users/authenticate'
import { getCurrentOrganization } from '@/utils/get-current-organization'

export default async function OrganizationProject() {
  const permissions = await ability()
  const organization = await getCurrentOrganization()

  const canCreateProject = permissions?.can('create', 'Project')

  if (!organization) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>

        {canCreateProject && (
          <Button size="sm" asChild>
            <Link href={`/org/${organization}/create-project`}>
              <PlusIcon className="mr-2 size-4" />
              Create project
            </Link>
          </Button>
        )}
      </div>

      <ProjectsList />
    </div>
  )
}
