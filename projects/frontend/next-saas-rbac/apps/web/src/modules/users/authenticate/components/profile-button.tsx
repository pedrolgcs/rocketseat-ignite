'use client'

import { AlertTriangle, ChevronDown, LogOut } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetProfileQuery } from '@/http/hooks/use-get-profile'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

export function ProfileButton() {
  const {
    data: profile,
    isError: isErrorOnGetProfile,
    isLoading: isLoadingOnGetProfile,
  } = useGetProfileQuery()

  if (isErrorOnGetProfile) {
    return (
      <div className="flex items-center">
        <AlertTriangle className="size-4 text-rose-400 dark:text-rose-300" />
        <p className="ml-2 text-sm font-medium text-rose-400 dark:text-rose-300">
          Failed on fetching profile, please refresh the page
        </p>
      </div>
    )
  }

  if (isLoadingOnGetProfile) {
    return <Skeleton className="h-8 w-8 rounded-full" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{profile?.user.name}</span>
          <span className="text-xs text-muted-foreground">
            {profile?.user.email}
          </span>
        </div>

        <Avatar className="size-8">
          {profile?.user.avatarUrl && (
            <AvatarImage src={profile.user.avatarUrl} />
          )}
          <AvatarFallback>
            {getInitials(profile?.user.name ?? 'DF')}
          </AvatarFallback>
        </Avatar>

        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={12}>
        <DropdownMenuItem asChild>
          <a href="/api/auth/sign-out">
            <LogOut className="mr-2 size-4" />
            Sign out
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
