import * as React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { IconChevronDown } from '@tabler/icons-react'

type RootProps = React.ComponentProps<'div'> & {
  children: React.ReactNode
  title: string
  icon?: React.ElementType
}

function Root({ title, icon: Icon, children }: RootProps) {
  return (
    <Accordion.Item
      value={title}
      className="group flex flex-col rounded data-[state=open]:shadow-md"
    >
      <Accordion.Header>
        <Accordion.Trigger className="flex w-full items-center gap-3 px-3 py-2 hover:bg-violet-50">
          {Icon && <Icon className="h-5 w-5 text-zinc-500" />}

          <span className="font-medium text-zinc-700 transition group-hover:text-violet-500">
            {title}
          </span>

          <IconChevronDown className="ml-auto h-5 w-5 text-zinc-400 transition group-hover:text-violet-300 group-data-[state=open]:-rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden rounded">
        {children}
      </Accordion.Content>
    </Accordion.Item>
  )
}

export { Root }
export type { RootProps }
