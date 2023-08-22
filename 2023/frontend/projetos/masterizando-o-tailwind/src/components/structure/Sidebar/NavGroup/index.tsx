import * as React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { IconChevronDown } from '@tabler/icons-react'

type NavGroupProps = {
  title: string
  icon: React.ElementType
  children: React.ReactNode
}

function NavGroup({ title, icon: Icon, children }: NavGroupProps) {
  return (
    <Accordion.Item
      value={title}
      className="group flex flex-col rounded px-3 py-2 transition hover:bg-violet-50"
    >
      <Accordion.Trigger className="flex w-full items-center gap-3">
        <Icon className="h-5 w-5 text-zinc-500" />

        <span className="font-medium text-zinc-700 transition group-hover:text-violet-500">
          {title}
        </span>

        <IconChevronDown className="ml-auto h-5 w-5 text-zinc-400 transition group-hover:text-violet-300" />
      </Accordion.Trigger>

      <Accordion.Content className="mt-2">{children}</Accordion.Content>
    </Accordion.Item>
  )
}

export { NavGroup }
