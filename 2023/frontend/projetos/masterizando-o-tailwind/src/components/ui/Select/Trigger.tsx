'use client'

import * as React from 'react'
import * as RadixSelect from '@radix-ui/react-select'
import { IconChevronDown } from '@tabler/icons-react'
import { cn } from '@/lib/tw-merge'

type TriggerProps = React.ComponentProps<typeof RadixSelect.Trigger>

function Trigger({ children, ...props }: TriggerProps) {
  return (
    <RadixSelect.Trigger
      {...props}
      className={cn(
        'flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm outline-none',
        'data-[placeholder]:text-zinc-600',
        'focus:border-violet-300 focus:ring-2 focus:ring-violet-100',
        'dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:border-violet-500 dark:focus-within:ring-violet-500/20 dark:data-[placeholder]:text-zinc-400',
        props.className,
      )}
    >
      {children}

      <RadixSelect.Icon>
        <IconChevronDown className="h-5 w-5 text-zinc-500" />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  )
}

export { Trigger }
export type { TriggerProps }
