import { CreateInvite } from '@/modules/organization/create-invite'
import { ListInvites } from '@/modules/organization/list-invites'
import { MembersList } from '@/modules/organization/members-list'

export default async function MembersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Members</h1>

      <div className="space-y-4">
        <CreateInvite />

        <ListInvites />

        <MembersList />
      </div>
    </div>
  )
}
