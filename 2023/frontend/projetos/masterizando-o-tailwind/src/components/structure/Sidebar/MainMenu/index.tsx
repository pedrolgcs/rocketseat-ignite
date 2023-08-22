'use client'

import {
  IconChartLine,
  IconFlag,
  IconHome,
  IconSquareCheck,
  IconStack2,
  IconUsers,
} from '@tabler/icons-react'
import { NavItem } from '../NavItem'

function MainMenu() {
  return (
    <nav className="space-y-0.5">
      <NavItem title="Home" href="#" icon={IconHome} />
      <NavItem title="Dashboard" href="#" icon={IconChartLine} />
      <NavItem title="Projects" href="#" icon={IconStack2} />
      <NavItem title="Tasks" href="#" icon={IconSquareCheck} />
      <NavItem title="Reporting" href="#" icon={IconFlag} />
      <NavItem title="Users" href="#" icon={IconUsers} />
    </nav>
  )
}

export { MainMenu }
