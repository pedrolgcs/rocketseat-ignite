import { useQuery } from '@tanstack/react-query'

import { getPopularProducts } from '../api/get-popular-products'

export const USE_GET_POPULAR_PRODUCTS_QUERY_KEY = 'popular-products'

export type useGetPopularProductsQueryKey = [
  typeof USE_GET_POPULAR_PRODUCTS_QUERY_KEY,
]

export const useGetPopularProductsQuery = () => {
  return useQuery({
    queryKey: ['metrics', USE_GET_POPULAR_PRODUCTS_QUERY_KEY],
    queryFn: getPopularProducts,
    staleTime: Infinity,
  })
}
