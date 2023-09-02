'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { IconLifebuoy, IconSettingsCog } from '@tabler/icons-react'
import * as NavGroup from '../NavGroup'
import { NavItem } from '../NavItem'

function SecondaryMenu() {
  return (
    <Accordion.Root type="single" collapsible>
      <nav className="space-y-0.5">
        <NavItem href="#" icon={IconLifebuoy}>
          Support
        </NavItem>

        <NavGroup.Root title="Setting" icon={IconSettingsCog}>
          <NavGroup.Item href="/settings">Account</NavGroup.Item>
          <NavGroup.Item href="#">Payments</NavGroup.Item>
        </NavGroup.Root>
      </nav>
    </Accordion.Root>
  )
}

export { SecondaryMenu }
