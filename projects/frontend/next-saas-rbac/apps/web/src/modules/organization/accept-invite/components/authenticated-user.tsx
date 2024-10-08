import { CheckCircleIcon, Loader2Icon, LogOutIcon } from 'lucide-react'
import Link from 'next/link'
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

  return (
    <div className="space-y-4">
      <p className="text-balance text-center  text-sm leading-relaxed text-muted-foreground">
        This invite wat sent to{' '}
        <span className="font-medium text-foreground">{invite.email}</span> but
        you currently authenticated as{' '}
        <span className="font-medium text-foreground">
          {profile?.user.email}
        </span>
      </p>

      <div className="space-y-2">
        <Button variant="secondary" className="w-full" asChild>
          <a href="/api/auth/sign-out">
            <LogOutIcon className="mr-2 size-4" /> Sign out from{' '}
            {profile?.user.email}
          </a>
        </Button>

        <Button variant="outline" className="w-full" asChild>
          <Link href="/">Back to dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
