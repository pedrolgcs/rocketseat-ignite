'use client'

import { CheckIcon, Loader2Icon, UserPlusIcon, XIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useAcceptOrganizationInviteMutation } from '@/http/hooks/use-accept-organization-invite-mutation'
import { useGetOrganizationPendingInvitesQuery } from '@/http/hooks/use-get-organization-peding-invites'
import { useRejectOrganizationInviteMutation } from '@/http/hooks/use-reject-organization-invite-mutation'
import dayjs from '@/lib/day-js'

export function PendingInvitesPopover() {
  const { data: pendingInvites, isLoading: isLoadingOnGetPendingInvites } =
    useGetOrganizationPendingInvitesQuery()

  const { mutate: rejectInvite } = useRejectOrganizationInviteMutation()

  const { mutate: acceptInvite } = useAcceptOrganizationInviteMutation()

  const handleAcceptInvite = (inviteId: string) => {
    acceptInvite(
      { inviteId },
      {
        onSuccess: () => {
          toast.success('Accept invite successful!')
        },
        onError(error) {
          toast.error(error.message)
        },
      },
    )
  }

  const handleRejectInvite = (id: string) => {
    rejectInvite(
      { id },
      {
        onSuccess: () => {
          toast.success('Reject invite successful!')
        },
        onError(error) {
          toast.error(error.message)
        },
      },
    )
  }

  if (isLoadingOnGetPendingInvites) {
    return (
      <Button size="icon" variant="outline">
        <Loader2Icon className="size-4 animate-spin" />
        <span className="sr-only">Invites</span>
      </Button>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline" className="relative">
          <UserPlusIcon className="size-4" />
          <span className="sr-only">Invites</span>

          {pendingInvites && pendingInvites.length > 0 && (
            <div className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500">
              <span className="text-[0.5rem] font-semibold text-zinc-50">
                {pendingInvites?.length}
              </span>
            </div>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-2">
        <span className="block text-base font-medium">Pending invites</span>

        <div className="flex flex-col gap-2">
          {pendingInvites?.map((invite) => (
            <div
              key={invite.id}
              className="space-y-2 rounded-md border border-muted-foreground/30 p-3"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  {invite.author?.name}
                </span>{' '}
                invited you to join in{' '}
                <span className="font-medium text-foreground">
                  {invite?.organization?.name}
                </span>{' '}
                <span className="text-xs">
                  - {dayjs(invite.createdAt).fromNow()}
                </span>
              </p>

              <div className="flex gap-1">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => handleAcceptInvite(invite.id)}
                >
                  <CheckIcon className="mr-2 size-4" /> Accept
                </Button>

                <Button
                  size="xs"
                  variant="ghost"
                  className="text-muted-foreground"
                  onClick={() => handleRejectInvite(invite.id)}
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
