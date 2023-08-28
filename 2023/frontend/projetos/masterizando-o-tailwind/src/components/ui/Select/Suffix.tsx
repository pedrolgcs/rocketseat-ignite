import * as React from 'react'

type ItemSuffixProps = React.ComponentProps<'span'> & {
  children: React.ReactNode
}

function ItemSuffix({ children }: ItemSuffixProps) {
  return <span className="text-zinc-500">{children}</span>
}

export { ItemSuffix }
export type { ItemSuffixProps }
