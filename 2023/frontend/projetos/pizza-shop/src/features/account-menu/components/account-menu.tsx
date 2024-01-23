import { LogOut } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

import { AccountTrigger } from './account-trigger'
import { Profile } from './profile'
import { UserInfo } from './user-info'

export function AccountMenu() {
  return (
    <DropdownMenu>
      <AccountTrigger />

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <UserInfo />
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Profile />
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(
            'text-rose-500 data-[highlighted]:text-rose-400',
            'dark:text-rose-400 dark:data-[highlighted]:text-rose-300',
          )}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
