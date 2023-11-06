import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/tw-merge'
import { SearchForm } from '.'
import { CartWidget } from './cart-widget'

export function Header() {
  return (
    <div
      className={cn(
        'grid grid-cols-header items-center gap-4 grid-areas-header',
        'lg:grid-cols-header-wide lg:grid-areas-header-wide',
      )}
    >
      <Link
        href="/"
        className="text-2xl font-extrabold text-white grid-in-logo"
      >
        devstore
      </Link>

      <div className="grid-in-search">
        <SearchForm />
      </div>

      <div className="flex items-center justify-end gap-4 grid-in-user">
        <CartWidget />

        <div className="h-4 w-px bg-zinc-700" />

        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 hover:underline">
            <span className="text-sm">Account</span>
            <Image
              src="https://github.com/pedrolgcs.png"
              alt="Pedro Henrique"
              width={24}
              height={24}
              className="h-6 w-6 rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
