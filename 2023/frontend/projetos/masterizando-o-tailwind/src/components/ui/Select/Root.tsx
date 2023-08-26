'use client'

import * as React from 'react'
import * as RadixSelect from '@radix-ui/react-select'

type RootProps = React.ComponentProps<typeof RadixSelect.Root> & {
  children: React.ReactNode
}

function Root(props: RootProps) {
  return <RadixSelect.Root {...props} />
}

export { Root }
export type { RootProps }
