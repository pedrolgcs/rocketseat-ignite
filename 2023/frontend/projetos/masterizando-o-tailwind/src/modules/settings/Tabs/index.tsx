'use client'

import * as React from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as RadixTabs from '@radix-ui/react-tabs'
import { cn } from '@/lib/tw-merge'
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
      <ScrollArea.Root className="w-full" type="scroll">
        <ScrollArea.Viewport className="w-full overflow-x-scroll">
          <RadixTabs.List
            className={cn(
              'mt-6 flex w-full gap-4 border-b border-zinc-200',
              'dark:border-zinc-700',
            )}
          >
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

            <TabItem
              value="team"
              title="Team"
              isSelected={currentTab === 'team'}
            />

            <TabItem
              value="plan"
              title="Plan"
              isSelected={currentTab === 'plan'}
            />

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

            <TabItem
              value="api"
              title="API"
              isSelected={currentTab === 'api'}
            />
          </RadixTabs.List>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          className="flex h-0.5 translate-y-1.5 touch-none select-none flex-col bg-zinc-100"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

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
