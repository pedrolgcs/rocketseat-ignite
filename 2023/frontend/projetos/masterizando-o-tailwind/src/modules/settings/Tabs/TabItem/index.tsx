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
      className="group relative px-1 pb-4 text-sm font-medium text-zinc-500 outline-none transition data-[state=active]:text-violet-700 hover:text-violet-700"
    >
      <span className="whitespace-nowrap rounded group-focus-visible:ring-2 group-focus-visible:ring-violet-400 group-focus-visible:ring-offset-4">
        {title}
      </span>

      {isSelected && (
        <motion.div
          layoutId="active-tab"
          className="absolute inset-x-0 -bottom-px h-0.5 rounded-md bg-violet-700"
        />
      )}
    </RadixTabs.Trigger>
  )
}

export { TabItem }
