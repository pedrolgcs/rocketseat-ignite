'use client'

import * as React from 'react'
import * as RadixSelect from '@radix-ui/react-select'
import { cn } from '@/lib/tw-merge'

type ValueProps = React.ComponentProps<typeof RadixSelect.Value>

function Value({ children, ...props }: ValueProps) {
  if (!children) {
    return <RadixSelect.Value {...props} />
  }

  return (
    <RadixSelect.Value {...props}>
      <span
        className={cn(
          'flex items-center gap-2 text-black',
          'dark:text-zinc-100',
        )}
      >
        {children}
      </span>
    </RadixSelect.Value>
  )
}
export { Value }
export type { ValueProps }
