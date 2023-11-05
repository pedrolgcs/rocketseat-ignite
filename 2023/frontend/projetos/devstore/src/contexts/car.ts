import { create } from 'zustand'

type CartItem = {
  productId: number
  quantity: number
}

type State = {
  items: CartItem[]
}

type Actions = {
  addToCart: (productId: number) => void
  reset: () => void
}

type CartContext = State & Actions

const initialState: State = {
  items: [],
}

export const useCart = create<CartContext>((set, get) => {
  return {
    ...initialState,

    addToCart: (productId: number) => {
      const { items } = get()

      const productCartIndex = items.findIndex(
        (item) => item.productId === productId,
      )

      if (productCartIndex >= 0) {
        items[productCartIndex].quantity++

        return set({
          items,
        })
      } else {
        const newItem = {
          productId,
          quantity: 1,
        }

        items.push(newItem)

        return set({
          items,
        })
      }
    },

    reset: () => {
      set(initialState)
    },
  }
})
