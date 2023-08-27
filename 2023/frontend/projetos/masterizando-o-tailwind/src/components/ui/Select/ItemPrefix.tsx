'use client'

import * as React from 'react'

type ItemPrefixProps = React.ComponentProps<'div'> & {
  children: React.ReactNode
}

function ItemPrefix({ children }: ItemPrefixProps) {
  return <div className="flex items-center justify-center">{children}</div>
}

export { ItemPrefix }
export type { ItemPrefixProps }
