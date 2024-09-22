'use client'

import { AvatarFallback } from '@radix-ui/react-avatar'
import { organizationSchema } from '@saas/auth'
import { CrownIcon } from 'lucide-react'
import { useMemo } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useAbility } from '@/hooks/use-ability'
import { useGetMembersQuery } from '@/http/hooks/use-get-members'
import { useGetMembershipQuery } from '@/http/hooks/use-get-membership'
import { useGetOrganizationBySlugQuery } from '@/http/hooks/use-get-organization-by-slug'

import { RemoveMember } from './remove-member'
import { TransferOwnership } from './transfer-ownership'

type MembersTableProps = {
  slug: string
}

export function MembersTable({ slug }: MembersTableProps) {
  const { ability } = useAbility()

  const {
    data: members,
    isLoading: isLoadingOnGetMembers,
    isError: isErrorOnGetMembers,
    error: errorOnGetMembers,
  } = useGetMembersQuery({ slug })

  const { data: membership } = useGetMembershipQuery({ slug })

  const { data: organization } = useGetOrganizationBySlugQuery({ slug })

  const canTransferOwnership = useMemo(() => {
    if (!organization) return null
    const authOrganization = organizationSchema.parse(organization)
    return ability?.can('transfer_ownership', authOrganization)
  }, [organization, ability])

  const canDeleteMember = useMemo(() => {
    return ability?.can('delete', 'User')
  }, [ability])

  if (isLoadingOnGetMembers) {
    return (
      <div className="space-y-1">
        <Skeleton className="h-14 w-full border" />
        <Skeleton className="h-14 w-full border" />
        <Skeleton className="h-14 w-full border" />
      </div>
    )
  }

  if (isErrorOnGetMembers) {
    return (
      <Alert variant="destructive" className="space-y-1">
        <AlertTitle>Ops! Something went wrong</AlertTitle>
        <AlertDescription>{errorOnGetMembers?.message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Table>
      <TableBody>
        {members?.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="py-2.5" style={{ width: 40 }}>
              <Avatar>
                <AvatarFallback />
                {member.avatarUrl && (
                  <AvatarImage
                    src={member.avatarUrl}
                    className="aspect-square size-full"
                  />
                )}
              </Avatar>
            </TableCell>

            <TableCell className="py-2.5">
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2 font-medium">
                  <span>{member.name}</span>
                  {member.userId === membership?.userId && <span>(me)</span>}
                  {organization?.ownerId === member.userId && (
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <CrownIcon className="size-3" />
                      Owner
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {member.email}
                </span>
              </div>
            </TableCell>

            <TableCell className="py-2.5">
              <div className="flex items-center justify-end gap-2">
                {canTransferOwnership && (
                  <TransferOwnership
                    me={membership?.userId}
                    member={member}
                    organizationSlug={slug}
                  />
                )}

                {canDeleteMember && (
                  <RemoveMember
                    me={membership?.userId}
                    member={member}
                    organizationSlug={slug}
                  />
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
