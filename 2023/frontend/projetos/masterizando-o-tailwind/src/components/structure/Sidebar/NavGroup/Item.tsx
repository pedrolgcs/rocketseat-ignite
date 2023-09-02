import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'

const item = tv({
  base: 'block px-3 py-2 font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-800',

  variants: {
    variant: {
      active: 'text-violet-500 hover:text-violet-700',
    },
  },
})

type ItemProps = {
  children: React.ReactNode
  href: string
}

function Item({ href, children }: ItemProps) {
  const pathname = usePathname()

  const variant = pathname === href ? 'active' : undefined

  return (
    <Link href={href} className={item({ variant })}>
      {children}
    </Link>
  )
}

export { Item }
export type { ItemProps }
