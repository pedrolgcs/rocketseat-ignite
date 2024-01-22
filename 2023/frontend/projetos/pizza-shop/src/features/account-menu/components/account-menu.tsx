import { Building, LogOut } from 'lucide-react'

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

export function AccountMenu() {
  return (
    <DropdownMenu>
      <AccountTrigger />

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <Profile />
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Building className="mr-2 h-4 w-4" />
          <span>Perfil da loja</span>
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
