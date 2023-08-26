'use client'

import * as React from 'react'
import * as RadixSelect from '@radix-ui/react-select'

type ValueProps = React.ComponentProps<typeof RadixSelect.Value>

function Value({ children, ...props }: ValueProps) {
  if (!children) {
    return <RadixSelect.Value {...props} />
  }

  return (
    <RadixSelect.Value {...props}>
      <span className="flex items-center gap-2 text-black">{children}</span>
    </RadixSelect.Value>
  )
}
export { Value }
export type { ValueProps }
