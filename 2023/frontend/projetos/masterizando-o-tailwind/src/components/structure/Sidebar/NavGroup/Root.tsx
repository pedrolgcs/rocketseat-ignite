import * as React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { IconChevronDown } from '@tabler/icons-react'
import { cn } from '@/lib/tw-merge'

type RootProps = React.ComponentProps<'div'> & {
  children: React.ReactNode
  title: string
  icon?: React.ElementType
}

function Root({ title, icon: Icon, children }: RootProps) {
  return (
    <Accordion.Item
      value={title}
      className={cn(
        'group flex flex-col rounded data-[state=open]:border data-[state=open]:border-zinc-200',
        'dark:data-[state=open]:border-zinc-700',
      )}
    >
      <Accordion.Header>
        <Accordion.Trigger
          className={cn(
            'flex w-full items-center gap-3 px-3 py-2 hover:bg-violet-50',
            'dark:hover:bg-zinc-800',
          )}
        >
          {Icon && (
            <Icon
              className={cn(
                'h-5 w-5 text-zinc-500',
                'dark:text-zinc-100 dark:group-hover:text-violet-300',
              )}
            />
          )}

          <span
            className={cn(
              'font-medium text-zinc-700 transition group-hover:text-violet-500',
              'dark:text-zinc-100 dark:group-hover:text-violet-300',
            )}
          >
            {title}
          </span>

          <IconChevronDown className="ml-auto h-5 w-5 text-zinc-500 transition group-hover:text-violet-300 group-data-[state=open]:-rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="overflow-hidden rounded data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
        {children}
      </Accordion.Content>
    </Accordion.Item>
  )
}

export { Root }
export type { RootProps }
