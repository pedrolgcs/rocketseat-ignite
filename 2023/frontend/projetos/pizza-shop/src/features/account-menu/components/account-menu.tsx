import { Building, LogOut } from 'lucide-react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

import { AccountTrigger } from './account-trigger'
import { StoreProfileDialog } from './store-profile-dialog'
import { UserResume } from './user-resume'

export function AccountMenu() {
  return (
    <Dialog>
      <DropdownMenu>
        <AccountTrigger />

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <UserResume />
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

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

      <StoreProfileDialog />
    </Dialog>
  )
}
