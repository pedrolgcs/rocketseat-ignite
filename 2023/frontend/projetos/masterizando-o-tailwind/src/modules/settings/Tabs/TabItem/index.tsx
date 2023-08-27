'use client'

import * as RadixTabs from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'
import type { TabValue } from '../index'

type TabItemProps = {
  value: TabValue
  title: string
  isSelected?: boolean
}

function TabItem({ value, title, isSelected }: TabItemProps) {
  return (
    <RadixTabs.Trigger
      value={value}
      className="relative px-1 pb-4 text-sm font-medium text-zinc-500 transition data-[state=active]:text-violet-700 hover:text-violet-700"
    >
      <span className="">{title}</span>

      {isSelected && (
        <motion.div
          layoutId="active-tab"
          className="absolute -bottom-px left-0 right-0 h-0.5 rounded-md bg-violet-700"
        />
      )}
    </RadixTabs.Trigger>
  )
}

export { TabItem }
