'use client'

import * as Accordion from '@radix-ui/react-accordion'
import {
  IconChartLine,
  IconFlag,
  IconHome,
  IconSquareCheck,
  IconStack2,
  IconUsers,
} from '@tabler/icons-react'
import * as NavGroup from '../NavGroup'
import { NavItem } from '../NavItem'

function MainMenu() {
  return (
    <Accordion.Root type="single" collapsible>
      <nav className="space-y-0.5">
        <NavItem href="/" icon={IconHome}>
          Home
        </NavItem>

        <NavItem href="#" icon={IconChartLine}>
          Dashboard
        </NavItem>

        <NavGroup.Root title="Projects" icon={IconStack2}>
          <NavGroup.Item href="#">Slack</NavGroup.Item>
          <NavGroup.Item href="#">Discord</NavGroup.Item>
          <NavGroup.Item href="#">Telegram</NavGroup.Item>
        </NavGroup.Root>

        <NavItem href="#" icon={IconSquareCheck}>
          Tasks
        </NavItem>

        <NavGroup.Root title="Reporting" icon={IconFlag}>
          <NavGroup.Item href="#">Overtime</NavGroup.Item>
          <NavGroup.Item href="#">Payslip</NavGroup.Item>
          <NavGroup.Item href="#">Timesheet</NavGroup.Item>
        </NavGroup.Root>

        <NavItem href="#" icon={IconUsers}>
          Users
        </NavItem>
      </nav>
    </Accordion.Root>
  )
}

export { MainMenu }
