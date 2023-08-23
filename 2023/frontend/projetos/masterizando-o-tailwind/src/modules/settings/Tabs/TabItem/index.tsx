'use client'

import * as RadixTabs from '@radix-ui/react-tabs'

type TabItemProps = {
  value: string
  title: string
}

function TabItem({ value, title }: TabItemProps) {
  return (
    <RadixTabs.Trigger
      value={value}
      className="group relative flex bg-zinc-400 px-1 pb-4 text-sm font-medium text-zinc-500 transition hover:text-violet-700 data-[state=active]:text-violet-700"
    >
      <span className="">{title}</span>

      <div className="absolute -bottom-px left-0 right-0 h-0.5 rounded-md group-data-[state=active]:bg-violet-700" />
    </RadixTabs.Trigger>
  )
}

export { TabItem }
