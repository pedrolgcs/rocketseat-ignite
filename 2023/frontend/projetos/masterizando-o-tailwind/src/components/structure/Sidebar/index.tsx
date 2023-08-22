import { IconLifebuoy, IconSearch, IconSettingsCog } from '@tabler/icons-react'
import { Input, Logo } from '@/components/ui'
import { MainMenu } from './MainMenu'
import { NavItem } from './NavItem'
import { Profile } from './Profile'
import { UsedSpaceWidget } from './UsedSpaceWidget'

function Sidebar() {
  return (
    <aside className="flex flex-col gap-6 border-r border-zinc-200 px-5 py-8">
      <Logo />

      <Input.Root>
        <Input.Prefix>
          <IconSearch className="h-5 w-5 text-zinc-500" />
        </Input.Prefix>

        <Input.Control placeholder="Search" />
      </Input.Root>

      <MainMenu />

      <div className="mt-auto flex flex-col gap-6">
        <nav className="space-y-0.5">
          <NavItem title="Support" href="#" icon={IconLifebuoy} />
          <NavItem title="Setting" href="#" icon={IconSettingsCog} />
        </nav>

        <UsedSpaceWidget />

        <div className="h-px bg-zinc-200" />

        <Profile />
      </div>
    </aside>
  )
}

export { Sidebar }
