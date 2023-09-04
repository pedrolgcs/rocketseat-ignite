import { IconSearch } from '@tabler/icons-react'
import { Input, Logo } from '@/components/ui'
import { MainMenu } from './MainMenu'
import { Profile } from './Profile'
import { SecondaryMenu } from './SecondayMenu'
import { UsedSpaceWidget } from './UsedSpaceWidget'

function Sidebar() {
  return (
    <aside className="fixed bottom-0 left-0 right-0 top-0 z-20 flex flex-col gap-6 border-b border-r border-zinc-200 bg-white p-4 lg:relative lg:right-auto lg:w-80 lg:border-r lg:px-5 lg:py-8">
      <Logo />

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

        <div className="h-px bg-zinc-200" />

        <Profile />
      </div>
    </aside>
  )
}

export { Sidebar }
