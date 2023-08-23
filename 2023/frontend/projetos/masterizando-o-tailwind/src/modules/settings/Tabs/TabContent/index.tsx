'use client'

import * as RadixTabs from '@radix-ui/react-tabs'
import type { TabValue } from '../index'

type TabContentProps = {
  value: TabValue
  children: React.ReactNode
}

function TabContent({ value, children }: TabContentProps) {
  return <RadixTabs.Content value={value}>{children}</RadixTabs.Content>
}

export { TabContent }
