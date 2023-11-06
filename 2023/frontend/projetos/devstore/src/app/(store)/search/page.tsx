import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/tw-merge'

export default async function SearchPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">moletom</span>
      </p>

      <div className={cn('flex flex-col gap-6', 'lg:grid lg:grid-cols-3')}>
        <Link
          href={`/product/moletom-never-stop-learning`}
          className={cn(
            'group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900',
            '',
          )}
        >
          <Image
            alt=""
            src="/moletom-never-stop-learning.png"
            width={480}
            height={480}
            quality={100}
            className="flex-1 transition-transform duration-300 group-hover:scale-105"
          />

          <div
            className={cn(
              'absolute bottom-6 right-6 grid h-12 max-w-[350px] grid-cols-[1fr_auto] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5',
              'lg:bottom-12 lg:right-12',
            )}
          >
            <span className="truncate text-sm">
              Moletom Never Stop Learning
            </span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4  font-semibold">
              {Number(129).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
