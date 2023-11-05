'use client'

import { useCart } from '@/contexts/car'

type AddToCartButtonProps = {
  productId: number
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart((state) => {
    return {
      addToCart: state.addToCart,
    }
  })

  function handleAddProductToCart() {
    addToCart(productId)
  }

  return (
    <button
      type="button"
      onClick={handleAddProductToCart}
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white transition-colors duration-300 hover:bg-emerald-700"
    >
      Add to cart
    </button>
  )
}
