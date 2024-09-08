import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ability } from '@/features/authenticate'

import { ShutdownOrganizationButton } from './shutdown-organization-button'

export async function ShutdownOrganization() {
  const permissions = await ability()

  const canShutDownOrganization = permissions?.can('delete', 'Organization')

  if (!canShutDownOrganization) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shutdown organization</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-md font-medium text-muted-foreground">
            You don't have permission to shutdown organization
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shutdown organization</CardTitle>
        <CardDescription>
          This will delete all organization data including all projects. You
          cannot undo this action.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ShutdownOrganizationButton />
      </CardContent>
    </Card>
  )
}
