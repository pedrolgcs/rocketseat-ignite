import { ArrowLeftRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

type TransferOwnershipProps = {
  me?: string
  ownerId?: string
  member: {
    id: string
    userId: string
  }
  organizationSlug: string
}

export function TransferOwnership({
  me,
  member,
  ownerId,
}: TransferOwnershipProps) {
  return (
    <Button
      size="sm"
      variant="ghost"
      disabled={member.userId === me || ownerId === member.userId}
    >
      <ArrowLeftRightIcon className="mr-2 size-4" />
      Transfer ownership
    </Button>
  )
}
