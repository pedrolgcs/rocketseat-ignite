'use client'

import * as Collapsible from '@radix-ui/react-collapsible'
import { IconMenu2, IconSearch } from '@tabler/icons-react'
import { ThemeSwitcher } from '@/components/structure'
import { Button, Input, Logo } from '@/components/ui'
import { cn } from '@/lib/tw-merge'
import { MainMenu } from './MainMenu'
import { Profile } from './Profile'
import { SecondaryMenu } from './SecondayMenu'
import { UsedSpaceWidget } from './UsedSpaceWidget'

function Sidebar() {
  return (
    <Collapsible.Root
      className={cn(
        'z-20 flex flex-col gap-6 border border-zinc-200 bg-white p-4',
        'lg:scrollbar-rounded-md lg:fixed lg:inset-x-0 lg:right-auto lg:top-0 lg:w-80 lg:overflow-y-auto lg:border-r lg:px-5 lg:py-8 lg:scrollbar lg:scrollbar-track-zinc-100 lg:scrollbar-thumb-zinc-300 lg:scrollbar-w-1 lg:data-[state=closed]:bottom-0 lg:data-[state=open]:bottom-0',
        'dark:border-zinc-700 dark:bg-zinc-900 dark:scrollbar-track-zinc-800 dark:scrollbar-thumb-zinc-600',
      )}
    >
      <div className="flex items-center justify-between">
        <Logo />

        <ThemeSwitcher />

        <Collapsible.Trigger asChild className="lg:hidden">
          <Button variant="ghost">
            <IconMenu2 className="h-6 w-6" />
          </Button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content
        forceMount
        className="flex flex-1 flex-col gap-6 data-[state=closed]:hidden lg:data-[state=closed]:flex"
      >
        <Input.Root>
          <Input.Prefix>
            <IconSearch className="h-5 w-5 text-zinc-500" />
          </Input.Prefix>

          <Input.Control id="search" placeholder="Search" />
        </Input.Root>

        <MainMenu />

        <div className="mt-auto flex flex-col gap-6">
          <SecondaryMenu />

          <UsedSpaceWidget />

          <div className={cn('h-px bg-zinc-200', 'dark:bg-zinc-700')} />

          <Profile />
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export { Sidebar }
