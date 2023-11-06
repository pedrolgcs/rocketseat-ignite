import { api } from '../api'
import { Product } from '../types/product'
import { RequestError } from '../types/request'

export async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  if (!response.ok) {
    const error: RequestError = await response.json()
    throw new Error(error.friendlyMessage)
  }

  const product = await response.json()

  return product
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
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

export async function getProducts(q: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${q}`, {
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
