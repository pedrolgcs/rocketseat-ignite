import {
  IconChartLine,
  IconFlag,
  IconHome,
  IconLifebuoy,
  IconSearch,
  IconSettingsCog,
  IconSquareCheck,
  IconStack2,
  IconUsers,
} from '@tabler/icons-react'
import { Logo } from '@/components/ui'
import { NavItem } from './NavItem'
import { Profile } from './Profile'
import { UsedSpaceWidget } from './UsedSpaceWidget'

function Sidebar() {
  return (
    <aside className="flex flex-col gap-6 border-r border-zinc-200 px-5 py-8">
      <Logo />

      <div className="mx-1 flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm">
        <div>
          <IconSearch className="h-5 w-5 text-zinc-500" />
        </div>

        <input
          className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600"
          placeholder="Search"
        />
      </div>

      <nav className="space-y-0.5">
        <NavItem title="Home" href="#" icon={IconHome} />
        <NavItem title="Dashboard" href="#" icon={IconChartLine} />
        <NavItem title="Projects" href="#" icon={IconStack2} />
        <NavItem title="Tasks" href="#" icon={IconSquareCheck} />
        <NavItem title="Reporting" href="#" icon={IconFlag} />
        <NavItem title="Users" href="#" icon={IconUsers} />
      </nav>

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
