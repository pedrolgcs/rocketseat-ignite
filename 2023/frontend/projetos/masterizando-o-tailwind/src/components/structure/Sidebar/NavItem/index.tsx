import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'

const navItem = tv({
  slots: {
    text: 'font-medium text-zinc-700 transition group-hover:text-violet-500',
    icon: 'h-5 w-5 text-zinc-500',
  },

  variants: {
    variant: {
      active: {
        text: 'text-violet-500 group-hover:text-violet-700',
        icon: 'text-violet-500 group-hover:text-violet-700',
      },
    },
  },
})

type NavItemProps = {
  href: string
  icon?: React.ElementType
  children: React.ReactNode
}

function NavItem({ href, icon: Icon, children }: NavItemProps) {
  const pathname = usePathname()

  const variant = pathname === href ? 'active' : undefined

  const slots = navItem({ variant })

  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded px-3 py-2 transition hover:bg-violet-50"
    >
      {Icon && <Icon className={slots.icon()} />}

      <span className={slots.text()}>{children}</span>
    </Link>
  )
}

export { NavItem }
