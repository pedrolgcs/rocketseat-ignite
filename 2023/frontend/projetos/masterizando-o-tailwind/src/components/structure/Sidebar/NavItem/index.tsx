import * as React from 'react'
// import { IconChevronDown } from '@tabler/icons-react'

type NavItemProps = {
  title: string
  href: string
  icon: React.ElementType
}

function NavItem({ title, href, icon: Icon }: NavItemProps) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 rounded px-3 py-2 transition hover:bg-violet-50"
    >
      <Icon className="h-5 w-5 text-zinc-500" />

      <span className="font-medium text-zinc-700 transition group-hover:text-violet-500">
        {title}
      </span>

      {/* <IconChevronDown className="ml-auto h-5 w-5 text-zinc-400 transition group-hover:text-violet-300" /> */}
    </a>
  )
}

export { NavItem }
