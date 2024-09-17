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
      <p className="text-sm font-medium text-muted-foreground">
        You don't have permission to vew members
      </p>
    )
  }

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div className="rounded border">
        <MembersTable slug={currentOrganization} />
      </div>
    </div>
  )
}
