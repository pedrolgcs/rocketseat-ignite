import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getProducts } from '@/data/request/product'
import { cn } from '@/lib/tw-merge'

type SearchProps = {
  searchParams: {
    q: string
  }
}

export default async function SearchPage({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  const products = await getProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className={cn('flex flex-col gap-6', 'lg:grid lg:grid-cols-3')}>
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className={cn(
              'group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900',
              '',
            )}
          >
            <Image
              alt={product.title}
              src={product.image}
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
              <span className="truncate text-sm">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4  font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
