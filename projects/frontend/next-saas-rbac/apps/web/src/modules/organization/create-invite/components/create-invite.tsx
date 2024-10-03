import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ability } from '@/modules/users/authenticate'
import { getCurrentOrganization } from '@/utils/get-current-organization'

import { CreateInviteForm } from './create-invite-form'

export async function CreateInvite() {
  const organization = await getCurrentOrganization()
  const permissions = await ability()

  const cannotCreateInvite = permissions?.cannot('create', 'Invite')

  if (!organization) return null

  if (cannotCreateInvite) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invite a new member</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-md font-medium text-muted-foreground">
            You don't have permission to invite a new members
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite a new member</CardTitle>
        <CardDescription>
          Invite a new member to your organization
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CreateInviteForm organization={organization} />
      </CardContent>
    </Card>
  )
}
