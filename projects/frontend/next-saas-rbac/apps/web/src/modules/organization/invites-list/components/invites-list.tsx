import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ability } from '@/modules/users/authenticate'
import { getCurrentOrganization } from '@/utils/get-current-organization'

import { InvitesTable } from './invites-table'

export async function InvitesList() {
  const permissions = await ability()

  const currentOrganization = await getCurrentOrganization()
  const cannotGetInvites = permissions?.cannot('get', 'Invite')

  if (!currentOrganization) return null

  if (cannotGetInvites) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>List of invites</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-md font-medium text-muted-foreground">
            You don't have permission to view invites
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>List of invites</CardTitle>
        <CardDescription>List of pending invites</CardDescription>
      </CardHeader>

      <CardContent>
        <InvitesTable organization={currentOrganization} />
      </CardContent>
    </Card>
  )
}
