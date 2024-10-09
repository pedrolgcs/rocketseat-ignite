'use client'

import { CheckIcon, UserPlusIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useGetOrganizationPendingInvitesQuery } from '@/http/hooks/use-get-organization-peding-invites'
import dayjs from '@/lib/day-js'

export function PendingInvitesPopover() {
  const { data: pendingInvites } = useGetOrganizationPendingInvitesQuery()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <UserPlusIcon className="size-4" />
          <span className="sr-only">Invites</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-2">
        <span className="block text-base font-medium">Pending invites</span>

        <div className="flex flex-col gap-2">
          {pendingInvites?.map((invite) => (
            <div className="space-y-2 rounded-md border border-muted-foreground/30 p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  {invite.author?.name}
                </span>{' '}
                invited you to join in{' '}
                <span className="font-medium text-foreground">
                  {invite?.organization?.name}
                </span>{' '}
                <span className="text-xs">
                  {dayjs(invite.createdAt).fromNow()}
                </span>
              </p>

              <div className="flex gap-1">
                <Button size="xs" variant="outline">
                  <CheckIcon className="mr-2 size-4" /> Accept
                </Button>

                <Button
                  size="xs"
                  variant="ghost"
                  className="text-muted-foreground"
                >
                  <XIcon className="mr-2 size-4" /> Revoke
                </Button>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
