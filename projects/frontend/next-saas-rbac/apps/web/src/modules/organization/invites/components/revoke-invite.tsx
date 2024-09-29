import { Loader2Icon, XOctagonIcon } from 'lucide-react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useRevokeMemberInviteMutation } from '@/http/hooks/use-revoke-member-invite-mutation'

type RevokeInviteProps = {
  organizationSlug: string
  inviteId: string
}

export function RevokeInvite({
  inviteId,
  organizationSlug,
}: RevokeInviteProps) {
  const { mutate: revokeMemberInvite, isPending: isPendingOnRevokeInvite } =
    useRevokeMemberInviteMutation()

  const handleRevokeInvite = () => {
    revokeMemberInvite(
      { organizationSlug, inviteId },
      {
        onSuccess: () => {
          toast.success('Revoke invite successful!')
        },
        onError(error) {
          toast.error(error.message)
        },
      },
    )
  }

  if (isPendingOnRevokeInvite) {
    return (
      <Button size="sm" variant="destructive" disabled>
        <Loader2Icon className="size-4 animate-spin" />
      </Button>
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <XOctagonIcon className="mr-2 size-4" /> Revoke invite
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove the
            invite
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRevokeInvite}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
