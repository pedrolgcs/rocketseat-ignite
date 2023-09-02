import { IconLogout } from '@tabler/icons-react'
import { Avatar, Button } from '@/components/ui'

function Profile() {
  return (
    <div className="flex items-center gap-3">
      <Avatar />

      <div className="flex flex-1 flex-col truncate">
        <span className="text-sm font-semibold text-zinc-700">Pedro H.</span>
        <span className="truncate text-sm text-zinc-500">
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
