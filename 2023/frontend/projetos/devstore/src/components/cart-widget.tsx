'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/contexts/car'

export function CartWidget() {
  const { items } = useCart((state) => {
    return {
      items: state.items,
    }
  })

  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="h-4 w-4" />
      <span className="text-sm">Cart {items.length}</span>
    </div>
  )
}
