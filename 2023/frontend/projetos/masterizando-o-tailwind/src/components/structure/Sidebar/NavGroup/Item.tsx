import * as React from 'react'

type ItemProps = {
  children: React.ReactNode
  href: string
}

function Item({ href, children }: ItemProps) {
  return (
    <a
      href={href}
      className="block px-3 py-1 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
    >
      {children}
    </a>
  )
}

export { Item }
export type { ItemProps }
