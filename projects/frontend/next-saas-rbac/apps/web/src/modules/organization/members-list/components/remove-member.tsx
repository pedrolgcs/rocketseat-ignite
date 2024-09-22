import { Loader2Icon, UserMinusIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useRemoveMemberMutation } from '@/http/hooks/use-remove-member-mutation'

type RemoveMemberProps = {
  me?: string
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
    <Button
      size="sm"
      variant="destructive"
      onClick={handleRemoveMember}
      disabled={me === member.userId}
    >
      <UserMinusIcon className="mr-2 size-4" />
      Remove
    </Button>
  )
}
