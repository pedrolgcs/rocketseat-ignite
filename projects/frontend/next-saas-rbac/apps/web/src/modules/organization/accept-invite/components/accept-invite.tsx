'use client'

import { CheckIcon, LoaderCircleIcon, LogInIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useIsAuthenticated } from '@/hooks/use-is-authenticated'
import { useGetOrganizationInvite } from '@/http/hooks/use-get-organization-invite'
import { setCookie } from '@/lib/cookies'
import dayjs from '@/lib/day-js'

type InviteProps = {
  id: string
}

export function AcceptInvite({ id }: InviteProps) {
  const router = useRouter()

  const {
    data: invite,
    isLoading: isLoadingOnGetInvite,
    isError: isErrorOnGetInvite,
    error: errorOnGetInvite,
    refetch: getInvite,
  } = useGetOrganizationInvite({ id })

  const { authenticated } = useIsAuthenticated()

  const handleNavigateToLogin = async () => {
    await setCookie('@saas:invited-id', id)
    router.push(`/auth/sign-in?email=${invite?.email}`)
  }

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
      <div className="flex flex-col gap-4">
        <p className="text-md font-medium leading-relaxed text-muted-foreground">
          {errorOnGetInvite.message}
        </p>

        <Button className="w-full" onClick={() => getInvite()}>
          Try again
        </Button>
      </div>
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

        {!authenticated && (
          <Button
            type="button"
            className="w-full"
            onClick={handleNavigateToLogin}
          >
            <LogInIcon className="mr-2 h-4 w-4" /> Sign in to accept the invite
          </Button>
        )}

        {authenticated && (
          <Button className="w-full">
            <CheckIcon className="mr-2 h-4 w-4" /> Accept Invitation
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
