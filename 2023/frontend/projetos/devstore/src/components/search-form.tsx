'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as HoverCard from '@radix-ui/react-hover-card'
import { Search, Loader2 } from 'lucide-react'
import { useDebounce } from 'usehooks-ts'
import { getProducts } from '@/data/request/product'
import { Product } from '@/data/types/product'
import { cn } from '@/lib/tw-merge'

export function SearchForm() {
  const [q, setQ] = React.useState<string>('')
  const [products, setProducts] = React.useState<Product[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const router = useRouter()

  const debouncedQuery = useDebounce<string>(q, 500)

  function handleReset() {
    setQ('')
    setProducts([])
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!q) {
      return null
    }

    router.push(`/search?q=${q}`)

    handleReset()
  }

  React.useEffect(() => {
    if (debouncedQuery) {
      setIsLoading(true)

      getProducts(debouncedQuery).then((data) => {
        setProducts(data)
        setIsLoading(false)
      })
    }

    if (!debouncedQuery) {
      setProducts([])
    }
  }, [debouncedQuery])

  return (
    <HoverCard.Root openDelay={300} closeDelay={300}>
      <HoverCard.Trigger asChild>
        <form
          onSubmit={handleSearch}
          className={cn(
            'flex w-full items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700',
            'lg:w-[320px]',
          )}
        >
          <Search className="h-5 w-5 text-zinc-500" />

          <input
            name="q"
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Buscar produtos..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
          />

          {isLoading && (
            <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
          )}
        </form>
      </HoverCard.Trigger>

      {products.length ? (
        <HoverCard.Portal>
          <HoverCard.Content
            className={cn(
              'flex max-h-[400px] max-w-xs flex-col space-y-4 divide-y divide-zinc-800 overflow-y-scroll rounded-lg bg-zinc-900 p-4 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-700',
              'lg:max-h-[600px] lg:max-w-lg',
            )}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="flex items-center duration-300 hover:scale-105"
                onClick={handleReset}
              >
                <Image
                  src={product.image}
                  alt={product.description}
                  width={150}
                  height={150}
                  quality={100}
                  className="flex-1"
                />

                <div className="">
                  <h1 className="text-xl font-bold leading-tight">
                    {product.title}
                  </h1>

                  <p
                    className={cn(
                      'hidden',
                      'md:mt-2 md:flex md:leading-relaxed md:text-zinc-400',
                    )}
                  >
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
            <HoverCard.Arrow className="fill-zinc-900" />
          </HoverCard.Content>
        </HoverCard.Portal>
      ) : null}
    </HoverCard.Root>
  )
}
