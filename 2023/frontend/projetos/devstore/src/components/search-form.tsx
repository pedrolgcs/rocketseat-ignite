'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { useDebounce } from 'usehooks-ts'
import { getProducts } from '@/data/request/product'
import { Product } from '@/data/types/product'
import { cn } from '@/lib/tw-merge'

export function SearchForm() {
  const [q, setQ] = React.useState<string>('')
  const [products, setProducts] = React.useState<Product[]>([])

  const router = useRouter()

  const debouncedQuery = useDebounce<string>(q, 500)

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!q) {
      return null
    }

    router.push(`/search?q=${q}`)
  }

  React.useEffect(() => {
    // async function execute() {
    //   const products = await getProducts(debouncedQuery)
    //   setProducts(products)
    // }
    // execute()
  }, [debouncedQuery])

  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        'flex w-full items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700',
        'lg:w-[320px]',
      )}
    >
      <Search className="h-5 w-5 text-zinc-500" />

      <input
        value={q}
        onChange={(event) => setQ(event.target.value)}
        placeholder="Buscar produtos..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
      />
    </form>
  )
}
