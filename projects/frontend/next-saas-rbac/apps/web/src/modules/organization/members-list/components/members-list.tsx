import { getCurrentOrganization } from '@/utils/get-current-organization'

import { MembersTable } from './members-table'

export async function MembersList() {
  const currentOrganization = await getCurrentOrganization()

  if (!currentOrganization) return null

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>
      <div className="rounded border">
        <MembersTable slug={currentOrganization} />
      </div>
    </div>
  )
}
