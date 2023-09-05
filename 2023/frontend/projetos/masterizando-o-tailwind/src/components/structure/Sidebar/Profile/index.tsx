import { IconLogout } from '@tabler/icons-react'
import { Avatar, Button } from '@/components/ui'
import { cn } from '@/lib/tw-merge'

function Profile() {
  return (
    <div className="flex items-center gap-3">
      <Avatar />

      <div className="flex flex-1 flex-col truncate">
        <span
          className={cn(
            'text-sm font-semibold text-zinc-700',
            'dark:text-zinc-100',
          )}
        >
          Pedro H.
        </span>
        <span
          className={cn('truncate text-sm text-zinc-500', 'dark:text-zinc-400')}
        >
          pedro.lg.cs@gmail.com
        </span>
      </div>

      <Button type="button" variant="ghost">
        <IconLogout className="h-5 w-5 text-zinc-500" />
      </Button>
    </div>
  )
}

export { Profile }
