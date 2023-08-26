'use client'

import * as React from 'react'
import * as RadixSelect from '@radix-ui/react-select'

type SeparatorProps = React.ComponentProps<typeof RadixSelect.Separator>

function Separator(props: SeparatorProps) {
  return <RadixSelect.Separator {...props} className="h-px bg-zinc-200" />
}

export { Separator }
export type { SeparatorProps }
