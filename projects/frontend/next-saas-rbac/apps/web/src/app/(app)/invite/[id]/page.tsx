import { AcceptInvite } from '@/modules/organization/accept-invite'

type InvitePageProps = {
  params: {
    id: string
  }
}

export default async function InvitePage({ params }: InvitePageProps) {
  const inviteId = params.id

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <AcceptInvite id={inviteId} />
    </div>
  )
}
