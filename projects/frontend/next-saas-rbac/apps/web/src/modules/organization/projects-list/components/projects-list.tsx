import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ability } from '@/modules/users/authenticate'
import { getCurrentOrganization } from '@/utils/get-current-organization'

import { ProjectsCards } from './projects-cards'

export async function ProjectsList() {
  const permissions = await ability()
  const organization = await getCurrentOrganization()

  const cannotGetProjects = permissions?.cannot('get', 'Project')

  if (!organization) return null

  if (cannotGetProjects) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>List of projects</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-md font-medium text-muted-foreground">
            You don't have permission to view organization projects
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>List of projects</CardTitle>
        <CardDescription>List of organization projects</CardDescription>
      </CardHeader>

      <CardContent>
        <ProjectsCards organization={organization} />
      </CardContent>
    </Card>
  )
}
