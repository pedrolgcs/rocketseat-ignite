import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/tw-merge'

export default async function Home() {
  return (
    <div
      className={cn(
        'grid grid-cols-1 grid-rows-1 gap-y-6',
        'lg:grid-cols-9 lg:grid-rows-6 lg:gap-6',
      )}
    >
      <Link
        href="/"
        className={cn(
          'group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900',
          'lg:col-span-6 lg:row-span-6',
        )}
      >
        <Image
          src="/moletom-never-stop-learning.png"
          alt="moletom-ai-side"
          width={920}
          height={920}
          quality={100}
          className="flex-1 transition-transform duration-300 group-hover:scale-105"
        />

        <div
          className={cn(
            'absolute bottom-6 right-6 grid h-12 max-w-[350px] grid-cols-[1fr_auto] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5',
            'lg:bottom-12 lg:right-12',
          )}
        >
          <span className="truncate text-sm">Moletom never stop learning</span>

          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            R$ 129,00
          </span>
        </div>
      </Link>

      <Link
        href="/"
        className={cn(
          'group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900',
          'lg:col-span-3 lg:row-span-3',
        )}
      >
        <Image
          src="/moletom-java.png"
          alt="moletom-java"
          width={920}
          height={920}
          quality={100}
          className="flex-1 transition-transform duration-300 group-hover:scale-105"
        />

        <div
          className={cn(
            'absolute bottom-6 right-6 grid h-12 max-w-[350px] grid-cols-[1fr_auto] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5',
            'lg:bottom-12 lg:right-12',
          )}
        >
          <span className="truncate text-sm">Moletom Java</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4  font-semibold">
            R$ 129,00
          </span>
        </div>
      </Link>

      <Link
        href="/"
        className={cn(
          'group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900',
          'lg:col-span-3 lg:row-span-3',
        )}
      >
        <Image
          src="/camiseta-dowhile-2022.png"
          alt="camiseta-dowhile-2022"
          width={920}
          height={920}
          quality={100}
          className="flex-1 transition-transform duration-300 group-hover:scale-105"
        />

        <div
          className={cn(
            'absolute bottom-6 right-6 grid h-12 max-w-[350px] grid-cols-[1fr_auto] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5',
            'lg:bottom-12 lg:right-12',
          )}
        >
          <span className="truncate text-sm">Camiseta Dowhile</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4  font-semibold">
            R$ 129,00
          </span>
        </div>
      </Link>
    </div>
  )
}
