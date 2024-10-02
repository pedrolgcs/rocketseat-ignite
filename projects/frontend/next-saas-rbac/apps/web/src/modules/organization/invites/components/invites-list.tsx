'use client'

import { MailIcon } from 'lucide-react'
import { useMemo } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useAbility } from '@/hooks/use-ability'
import { useGetOrganizationInvites } from '@/http/hooks/use-get-organization-invites'
import dayjs from '@/lib/day-js'

import { RevokeInvite } from './revoke-invite'

type InvitesListProps = {
  organization: string
}

export function InvitesList({ organization }: InvitesListProps) {
  const { ability } = useAbility()

  const {
    data: invites,
    isPending: isLoadingOnGetInvites,
    isError: isErrorOnGetInvites,
    error: errorOnGetInvites,
  } = useGetOrganizationInvites({
    organizationSlug: organization,
  })

  const canDeleteInvite = useMemo(() => {
    return ability?.can('delete', 'Invite')
  }, [ability])

  if (isLoadingOnGetInvites) {
    return (
      <div className="space-y-1">
        <Skeleton className="h-14 w-full border" />
        <Skeleton className="h-14 w-full border" />
        <Skeleton className="h-14 w-full border" />
      </div>
    )
  }

  if (isErrorOnGetInvites) {
    return (
      <Alert variant="destructive" className="space-y-1">
        <AlertTitle>Ops! Something went wrong</AlertTitle>
        <AlertDescription>{errorOnGetInvites?.message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Invites</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {invites?.map((invite) => (
              <TableRow key={invite.id}>
                <TableCell className="py-2.5">
                  <span className="flex items-center gap-4 text-muted-foreground">
                    <MailIcon className="size-4 text-muted-foreground" />
                    {invite.email}
                  </span>
                </TableCell>

                <TableCell className="py-2.5">
                  <div className="flex justify-end">
                    <span className="text-xs font-semibold text-muted-foreground">
                      sent {dayjs().to(invite.createdAt)}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-2.5" style={{ width: 100 }}>
                  <div className="flex justify-end">
                    <span className="font-semibold text-foreground">
                      {invite.role}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-2.5" style={{ width: 170 }}>
                  <div className="flex justify-end">
                    {canDeleteInvite && (
                      <RevokeInvite
                        inviteId={invite.id}
                        organizationSlug={organization}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {invites?.length === 0 && (
              <TableRow>
                <TableCell className="border text-center text-muted-foreground">
                  No invites found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
