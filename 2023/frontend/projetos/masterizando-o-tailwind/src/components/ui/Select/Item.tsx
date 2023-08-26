'use client'

import * as React from 'react'
import * as Select from '@radix-ui/react-select'
import { IconCheck } from '@tabler/icons-react'

type ItemProps = React.ComponentProps<typeof Select.Item>

function Item({ children, ...props }: ItemProps) {
  return (
    <Select.Item
      className="flex items-center justify-between gap-2 px-3 py-2.5 outline-none data-[highlighted]:bg-zinc-50 data-[highlighted]:outline-none"
      {...props}
    >
      {children}
      <Select.ItemIndicator>
        <IconCheck className="h-4 w-4 text-violet-500" />
      </Select.ItemIndicator>
    </Select.Item>
  )
}

export { Item }
export type { ItemProps }
