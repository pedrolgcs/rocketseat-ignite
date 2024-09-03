import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ability } from '@/features/authenticate'
import { ShutdownOrganizationButton } from '@/features/delete-organization'
import { UpdateOrganization } from '@/features/update-organization'

export default async function SettingsPage() {
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutDownOrganization = permissions?.can('delete', 'Organization')

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-4">
        {canUpdateOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Organizations settings</CardTitle>
              <CardDescription>
                Update your organization details
              </CardDescription>
            </CardHeader>

            <CardContent>
              <UpdateOrganization />
            </CardContent>
          </Card>
        )}

        {canGetBilling && (
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Update your billing details</CardDescription>
            </CardHeader>

            <CardContent>
              <div>Billing</div>
            </CardContent>
          </Card>
        )}

        {canShutDownOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Shutdown organization</CardTitle>
              <CardDescription>
                This will delete all organization data including all projects.
                You cannot undo this action.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShutdownOrganizationButton />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
