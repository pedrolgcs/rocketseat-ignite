import * as React from 'react'
import Link from 'next/link'

type NavItemProps = {
  href: string
  icon?: React.ElementType
  children: React.ReactNode
}

function NavItem({ href, icon: Icon, children }: NavItemProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded px-3 py-2 transition hover:bg-violet-50"
    >
      {Icon && <Icon className="h-5 w-5 text-zinc-500" />}

      <span className="font-medium text-zinc-700 transition group-hover:text-violet-500">
        {children}
      </span>
    </Link>
  )
}

export { NavItem }
