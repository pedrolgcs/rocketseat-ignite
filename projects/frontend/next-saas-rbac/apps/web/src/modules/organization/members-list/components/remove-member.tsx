import { Loader2Icon, UserMinusIcon } from 'lucide-react'
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
import { useRemoveMemberMutation } from '@/http/hooks/use-remove-member-mutation'

type RemoveMemberProps = {
  me?: string
  ownerId?: string
  member: {
    id: string
    userId: string
  }
  organizationSlug: string
}

export function RemoveMember({
  me,
  member,
  organizationSlug,
  ownerId,
}: RemoveMemberProps) {
  const { mutate: removeMember, isPending: isPendingOnRemoveMember } =
    useRemoveMemberMutation()

  const handleRemoveMember = () => {
    removeMember(
      { organizationSlug, memberId: member.id },
      {
        onSuccess: () => {
          toast.success('Remove member successful!')
        },
        onError(error) {
          toast.error(error.message)
        },
      },
    )
  }

  if (isPendingOnRemoveMember) {
    return (
      <Button size="sm" variant="destructive" disabled>
        <Loader2Icon className="size-4 animate-spin" />
      </Button>
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="destructive"
          disabled={me === member.userId || member.userId === ownerId}
        >
          <UserMinusIcon className="mr-2 size-4" />
          Remove
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove member
            from the organization.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRemoveMember}
            disabled={isPendingOnRemoveMember}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
