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
import { NavGroup } from '../NavGroup'
import { NavItem } from '../NavItem'

function MainMenu() {
  return (
    <Accordion.Root type="single" collapsible>
      <nav className="space-y-0.5">
        <NavItem title="Home" href="#" icon={IconHome} />
        <NavItem title="Dashboard" href="#" icon={IconChartLine} />
        <NavItem title="Projects" href="#" icon={IconStack2} />
        <NavItem title="Tasks" href="#" icon={IconSquareCheck} />
        {/* <NavItem title="Reporting" href="#" icon={IconFlag} /> */}
        <NavGroup title="Reporting" icon={IconFlag}>
          <p>loremlkdjsakldjaklj</p>
        </NavGroup>
        <NavItem title="Users" href="#" icon={IconUsers} />
      </nav>
    </Accordion.Root>
  )
}

export { MainMenu }
