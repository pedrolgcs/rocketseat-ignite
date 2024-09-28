'use client'

import type { Role } from '@saas/auth'
import { LoaderCircleIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { toast } from 'sonner'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUpdateMemberRoleMutation } from '@/http/hooks/use-update-member-role-mutation'

const ROLES: Role[] = ['ADMIN', 'MEMBER', 'BILLING']

type UpdateMemberRoleProps = ComponentProps<typeof Select> & {
  me?: string
  ownerId?: string
  organizationSlug: string
  member: {
    id: string
    userId: string
    role: Role
  }
}

export function UpdateMemberRole({
  member,
  me,
  ownerId,
  organizationSlug,
  ...props
}: UpdateMemberRoleProps) {
  const { mutate: updateMemberRole, isPending: isPendingOnUpdateMemberRole } =
    useUpdateMemberRoleMutation()

  const handleUpdateMemberRole = (role: Role) => {
    updateMemberRole(
      { organizationSlug, role, memberId: member.id },
      {
        onSuccess: () => {
          toast.success('Update member role successful!')
        },
        onError(error) {
          toast.error(error.message)
        },
      },
    )
  }

  return (
    <Select
      {...props}
      disabled={member.userId === me || ownerId === member.userId}
      defaultValue={member.role}
      onValueChange={(value: Role) => handleUpdateMemberRole(value)}
    >
      <SelectTrigger className="h-8 w-36">
        <SelectValue />

        {isPendingOnUpdateMemberRole && (
          <LoaderCircleIcon className="size-4 animate-spin text-muted-foreground" />
        )}
      </SelectTrigger>

      <SelectContent>
        {ROLES.map((role) => (
          <SelectItem key={role} value={role}>
            {role}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
