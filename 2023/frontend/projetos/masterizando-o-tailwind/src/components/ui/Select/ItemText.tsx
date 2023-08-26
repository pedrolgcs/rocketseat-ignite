'use client'

import * as React from 'react'
import * as RadixSelect from '@radix-ui/react-select'

type ItemTextProps = React.ComponentProps<typeof RadixSelect.ItemText> & {
  children: React.ReactNode
}

function ItemText({ children }: ItemTextProps) {
  return (
    <RadixSelect.ItemText asChild>
      <span className="flex items-center gap-2 text-left leading-5 text-zinc-900">
        {children}
      </span>
    </RadixSelect.ItemText>
  )
}

export { ItemText }
export type { ItemTextProps }
