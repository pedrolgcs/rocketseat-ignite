'use client'

import * as React from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import * as Contents from './Contents'
import { TabContent } from './TabContent'
import { TabItem } from './TabItem'

type TabValue =
  | 'my-details'
  | 'profile'
  | 'team'
  | 'password'
  | 'plan'
  | 'billing'
  | 'email'
  | 'notifications'
  | 'integrations'
  | 'api'

function Tabs() {
  const [currentTab, setCurrentTab] = React.useState<TabValue>('my-details')

  return (
    <RadixTabs.Root
      value={currentTab}
      onValueChange={(value) => setCurrentTab(value as TabValue)}
      className="flex flex-col gap-6"
    >
      <RadixTabs.List className="mt-6 flex w-full gap-4 border-b border-zinc-200">
        <TabItem
          value="my-details"
          title="My details"
          isSelected={currentTab === 'my-details'}
        />

        <TabItem
          value="profile"
          title="Profile"
          isSelected={currentTab === 'profile'}
        />

        <TabItem
          value="password"
          title="Password"
          isSelected={currentTab === 'password'}
        />

        <TabItem value="team" title="Team" isSelected={currentTab === 'team'} />

        <TabItem value="plan" title="Plan" isSelected={currentTab === 'plan'} />

        <TabItem
          value="billing"
          title="Billing"
          isSelected={currentTab === 'billing'}
        />

        <TabItem
          value="email"
          title="Email"
          isSelected={currentTab === 'email'}
        />

        <TabItem
          value="notifications"
          title="Notifications"
          isSelected={currentTab === 'notifications'}
        />

        <TabItem
          value="integrations"
          title="Integrations"
          isSelected={currentTab === 'integrations'}
        />

        <TabItem value="api" title="API" isSelected={currentTab === 'api'} />
      </RadixTabs.List>

      <TabContent value="my-details">
        <Contents.MyDetails />
      </TabContent>

      <TabContent value="profile">
        <Contents.Profile />
      </TabContent>
    </RadixTabs.Root>
  )
}

export { Tabs }
export type { TabValue }
