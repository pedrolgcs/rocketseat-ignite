'use client'

import { AvatarFallback } from '@radix-ui/react-avatar'
import { CrownIcon } from 'lucide-react'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useGetMembersQuery } from '@/http/hooks/use-get-members'
import { useGetMembershipQuery } from '@/http/hooks/use-get-membership'
import { useGetOrganizationBySlugQuery } from '@/http/hooks/use-get-organization-by-slug'

type MembersTableProps = {
  slug: string
}

export function MembersTable({ slug }: MembersTableProps) {
  const {
    data: members,
    isLoading: isLoadingOnGetMembers,
    isError: isErrorOnGetMembers,
    error: errorOnGetMembers,
  } = useGetMembersQuery({ slug })

  const { data: membership } = useGetMembershipQuery({ slug })

  const { data: organization } = useGetOrganizationBySlugQuery({ slug })

  if (isLoadingOnGetMembers) {
    return <h1>Loading...</h1>
  }

  console.log(errorOnGetMembers)

  if (isErrorOnGetMembers) {
    return <h1>{errorOnGetMembers.message}...</h1>
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
              <div className="flex items-center"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
