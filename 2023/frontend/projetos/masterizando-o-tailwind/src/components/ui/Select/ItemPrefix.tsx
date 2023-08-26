'use client'

import * as React from 'react'

type ItemPrefixProps = {
  children: React.ReactNode
}

function ItemPrefix({ children }: ItemPrefixProps) {
  return (
    <div className="flex h-4 w-5 items-center justify-center">{children}</div>
  )
}

export { ItemPrefix }
export type { ItemPrefixProps }
