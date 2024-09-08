import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ability } from '@/features/authenticate'
import { getCurrentOrganization } from '@/utils/get-current-organization'

import { UpdateOrganizationForm } from './update-organization-form'

export async function UpdateOrganization() {
  const permissions = await ability()

  const currentOrganization = await getCurrentOrganization()

  const cannotUpdateOrganization = permissions?.cannot('update', 'Organization')

  if (!currentOrganization) return null

  if (cannotUpdateOrganization) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Organizations settings</CardTitle>
          <CardDescription>Update your organization details</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-md font-medium text-muted-foreground">
            You don't have permission to update organization
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organizations settings</CardTitle>
        <CardDescription>Update your organization details</CardDescription>
      </CardHeader>

      <CardContent>
        <UpdateOrganizationForm slug={currentOrganization} />
      </CardContent>
    </Card>
  )
}
