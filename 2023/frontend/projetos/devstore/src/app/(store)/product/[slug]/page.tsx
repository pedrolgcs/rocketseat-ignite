import { Metadata } from 'next'
import Image from 'next/image'
import { AddToCartButton } from '@/components'
import { getFeaturedProducts, getProduct } from '@/data/request/product'
import { cn } from '@/lib/tw-merge'
import { ProductSizes } from './components/product-sizes'

type ProductPageProps = {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  return {
    title: params.slug,
  }
}

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const products = await getFeaturedProducts()

  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
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

            <ProductSizes sizes={product.sizes} />
          </div>
        </div>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}
