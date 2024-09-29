import { ability } from '@/modules/users/authenticate'
import { getCurrentOrganization } from '@/utils/get-current-organization'

import { CreateInvite } from './create-invite'
import { InvitesList } from './invites-list'

export async function Invites() {
  const permissions = await ability()

  const currentOrganization = await getCurrentOrganization()
  const cabCreateInvite = permissions?.can('create', 'Invite')
  const canGetInvites = permissions?.can('get', 'Invite')

  if (!currentOrganization) return null

  return (
    <div className="space-y-4">
      {cabCreateInvite && <CreateInvite />}

      {canGetInvites && <InvitesList organization={currentOrganization} />}
    </div>
  )
}
