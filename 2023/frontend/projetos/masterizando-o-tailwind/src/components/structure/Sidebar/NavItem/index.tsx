import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'
import { cn } from '@/lib/tw-merge'

const navItem = tv({
  slots: {
    wrapper: cn(
      'group flex items-center gap-3 rounded px-3 py-2 transition hover:bg-violet-50',
      'dark:hover:bg-zinc-800',
    ),
    text: cn(
      'font-medium text-zinc-700 transition group-hover:text-violet-500',
      'dark:text-zinc-100 dark:group-hover:text-violet-300',
    ),
    icon: cn(
      'h-5 w-5 text-zinc-500',
      'group-hover:text-violet-300 dark:text-zinc-100',
    ),
  },

  variants: {
    variant: {
      active: {
        text: cn(
          'text-violet-500 group-hover:text-violet-500',
          'dark:text-violet-500 dark:group-hover:text-violet-300',
        ),
        icon: cn(
          'text-violet-500 group-hover:text-violet-500',
          'dark:text-violet-500 dark:group-hover:text-violet-300',
        ),
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
    <Link href={href} className={slots.wrapper()}>
      {Icon && <Icon className={slots.icon()} />}

      <span className={slots.text()}>{children}</span>
    </Link>
  )
}

export { NavItem }
