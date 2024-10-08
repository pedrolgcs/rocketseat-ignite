import { CheckCircleIcon, Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useAcceptOrganizationInviteMutation } from '@/http/hooks/use-accept-organization-invite-mutation'
import { useGetProfileQuery } from '@/http/hooks/use-get-profile'

type AuthenticatedUserProps = {
  invite: {
    id: string
    organization: {
      name: string
    }
    email: string
  }
}

export function AuthenticatedUser({ invite }: AuthenticatedUserProps) {
  const router = useRouter()

  const { data: profile } = useGetProfileQuery()

  const { mutate: acceptInvite, isPending: isPendingOnAcceptInvite } =
    useAcceptOrganizationInviteMutation()

  const userIsAuthenticatedWithSameEmailFromInvite =
    profile?.user.email === invite.email

  const handleAcceptInvite = () => {
    acceptInvite(
      { id: invite.id },
      {
        onSuccess: () => {
          toast.success('Accept invite successful!')
          router.push('/')
        },
        onError(error) {
          toast.error(error.message)
        },
      },
    )
  }

  if (isPendingOnAcceptInvite) {
    return (
      <Button type="button" className="w-full" disabled>
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Join
        {invite.organization.name}
      </Button>
    )
  }

  if (userIsAuthenticatedWithSameEmailFromInvite) {
    return (
      <Button type="button" className="w-full" onClick={handleAcceptInvite}>
        <CheckCircleIcon className="mr-2 h-4 w-4" /> Join
        {invite.organization.name}
      </Button>
    )
  }

  return null
}
