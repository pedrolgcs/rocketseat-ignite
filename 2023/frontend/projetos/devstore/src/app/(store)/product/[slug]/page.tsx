import Image from 'next/image'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { cn } from '@/lib/tw-merge'

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const product = await response.json()

  return product
}

type ProductPage = {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPage) {
  const product = await getProduct(params.slug)

  return (
    <div
      className={cn(
        'relative flex flex-1 flex-col gap-6',
        'lg:grid lg:grid-cols-3 lg:grid-rows-1',
      )}
    >
      <div
        className={cn(
          'flex overflow-hidden',
          'lg:col-span-2  lg:max-h-[860px]',
        )}
      >
        <Image
          src={product.image}
          alt={product.description}
          width={1000}
          height={1000}
          quality={100}
          className="flex-1"
        />
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col justify-between',
          'lg:justify-center lg:px-12',
        )}
      >
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

          <p className="mt-2 leading-relaxed text-zinc-400">
            {product.description}
          </p>

          <div className={cn('mt-5 flex items-center gap-3', 'lg:mt-8')}>
            <span className="flex items-center justify-center rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>

            <span className="text-sm text-zinc-400">
              Em 12x s/ juros de R${' '}
              {(product.price / 12).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>

          <div className={cn('mt-5 space-y-4', 'lg:mt-8')}>
            <span className="block text-2xl font-semibold">Tamanhos</span>

            <div className="flex gap-2">
              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold transition-colors duration-300 hover:border-zinc-600 hover:bg-zinc-700"
              >
                P
              </button>

              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold transition-colors duration-300 hover:border-zinc-600 hover:bg-zinc-700"
              >
                M
              </button>

              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold transition-colors duration-300 hover:border-zinc-600 hover:bg-zinc-700"
              >
                G
              </button>

              <button
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold duration-300 hover:border-zinc-600 hover:bg-zinc-700"
              >
                GG
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white transition-colors duration-300 hover:bg-emerald-700"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  )
}
