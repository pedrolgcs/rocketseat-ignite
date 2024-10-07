'use client'

import { CheckIcon, LoaderCircleIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useGetOrganizationInvite } from '@/http/hooks/use-get-organization-invite'
import dayjs from '@/lib/day-js'

type InviteProps = {
  id: string
}

export function AcceptInvite({ id }: InviteProps) {
  const {
    data: invite,
    isLoading: isLoadingOnGetInvite,
    isError: isErrorOnGetInvite,
    error: errorOnGetInvite,
    refetch: getInvite,
  } = useGetOrganizationInvite({ id })

  if (isLoadingOnGetInvite) {
    return (
      <Card className="flex w-full max-w-md flex-col justify-center space-y-6">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="size-16">
              <AvatarFallback />
            </Avatar>

            <div className="flex w-full flex-col space-y-2">
              <div className="h-5 w-full rounded-md bg-zinc-800" />
              <div className="h-6 w-full rounded-md bg-zinc-800" />
              <div className="h-5 w-1/3 rounded-md bg-zinc-800" />
            </div>
          </div>

          <Button className="w-full" disabled>
            <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (isErrorOnGetInvite) {
    return (
      <Alert variant="destructive" className="w-full max-w-sm space-y-4">
        <AlertTitle>Ops! Something went wrong</AlertTitle>
        <AlertDescription>{errorOnGetInvite?.message}</AlertDescription>
        <Button className="w-full" onClick={() => getInvite()}>
          Try again
        </Button>
      </Alert>
    )
  }

  return (
    <Card className="flex w-full max-w-md flex-col justify-center space-y-6">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="size-16">
            {invite?.author?.avatarUrl && (
              <AvatarImage src={invite.author.avatarUrl} />
            )}

            <AvatarFallback />
          </Avatar>

          <div>
            <h3 className="text-lg font-semibold">
              {invite?.organization.name}
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">
                {invite?.author?.name ?? 'Someone'}
              </span>{' '}
              invited you to join in{' '}
              <span className="font-medium text-foreground">
                {invite?.organization?.name}
              </span>
            </p>

            <span className="text-xs text-muted-foreground underline underline-offset-4">
              {dayjs(invite?.createdAt).fromNow()}
            </span>
          </div>
        </div>

        <Button className="w-full">
          <CheckIcon className="mr-2 h-4 w-4" /> Accept Invitation
        </Button>
      </CardContent>
    </Card>
  )
}
