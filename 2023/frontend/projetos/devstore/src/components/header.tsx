import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { cn } from '@/lib/tw-merge'
import { CartWidget } from './cart-widget'

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold text-white">
          devstore
        </Link>

        <form
          className={cn(
            'hidden',
            'md:flex md:w-[320px] md:items-center md:gap-3 md:rounded-full md:bg-zinc-900 md:px-5 md:py-3 md:ring-zinc-700',
          )}
        >
          <Search className="h-5 w-5 text-zinc-500" />

          <input
            placeholder="Buscar produtos..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
          />
        </form>
      </div>

      <div className="flex items-center gap-4">
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
