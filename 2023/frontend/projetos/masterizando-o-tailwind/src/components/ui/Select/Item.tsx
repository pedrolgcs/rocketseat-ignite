'use client'

import * as React from 'react'
import * as Select from '@radix-ui/react-select'
import { IconCheck } from '@tabler/icons-react'
import { cn } from '@/lib/tw-merge'

type ItemProps = React.ComponentProps<typeof Select.Item>

function Item({ children, ...props }: ItemProps) {
  return (
    <Select.Item
      className={cn(
        'flex items-center justify-between gap-2 px-3 py-2.5 outline-none data-[highlighted]:bg-zinc-50 data-[highlighted]:outline-none',
        'dark:data-[highlighted]:bg-zinc-700',
      )}
      {...props}
    >
      {children}
      <Select.ItemIndicator>
        <IconCheck className="h-4 w-4 text-violet-500 dark:text-violet-300" />
      </Select.ItemIndicator>
    </Select.Item>
  )
}

export { Item }
export type { ItemProps }
