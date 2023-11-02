import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { cn } from '@/lib/tw-merge'

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    cache: 'no-store',
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const products = await response.json()

  return products
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function HomePage() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div
      className={cn(
        'grid grid-cols-1 grid-rows-1 gap-y-6',
        'lg:grid-cols-9 lg:grid-rows-6 lg:gap-6',
      )}
    >
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className={cn(
          'group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900',
          'lg:col-span-6 lg:row-span-6',
        )}
      >
        <Image
          src={highlightedProduct.image}
          alt={highlightedProduct.description}
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
          <span className="truncate text-sm">{highlightedProduct.title}</span>

          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => (
        <Link
          key={product.slug}
          href={`/product/${product.slug}`}
          className={cn(
            'group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900',
            'lg:col-span-3 lg:row-span-3',
          )}
        >
          <Image
            src={product.image}
            alt={product.description}
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
  )
}
