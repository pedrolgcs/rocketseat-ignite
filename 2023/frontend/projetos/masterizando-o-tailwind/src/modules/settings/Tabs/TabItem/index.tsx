'use client'

import * as RadixTabs from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'
import { cn } from '@/lib/tw-merge'
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
      className={cn(
        'group relative px-1 pb-4 text-sm font-medium text-zinc-500 outline-none transition data-[state=active]:text-violet-700 hover:text-violet-700',
        'data-[state=active]:text-violet-300 dark:text-zinc-400 dark:hover:text-violet-300',
      )}
    >
      <span className="whitespace-nowrap rounded group-focus-visible:ring-2 group-focus-visible:ring-violet-400 group-focus-visible:ring-offset-4">
        {title}
      </span>

      {isSelected && (
        <motion.div
          layoutId="active-tab"
          className={cn(
            'absolute inset-x-0 -bottom-px h-0.5 rounded-md bg-violet-700',
            'dark:bg-violet-300',
          )}
        />
      )}
    </RadixTabs.Trigger>
  )
}

export { TabItem }
