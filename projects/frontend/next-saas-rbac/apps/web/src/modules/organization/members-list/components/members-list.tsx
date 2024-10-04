import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ability } from '@/modules/users/authenticate'
import { getCurrentOrganization } from '@/utils/get-current-organization'

import { MembersTable } from './members-table'

export async function MembersList() {
  const permissions = await ability()
  const currentOrganization = await getCurrentOrganization()

  const cannotGetMembers = permissions?.cannot('get', 'User')

  if (!currentOrganization) return null

  if (cannotGetMembers) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>List of members</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-md font-medium text-muted-foreground">
            You don't have permission to view members
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>List of members</CardTitle>
        <CardDescription>List of organization members</CardDescription>
      </CardHeader>

      <CardContent>
        <MembersTable slug={currentOrganization} />
      </CardContent>
    </Card>
  )
}
