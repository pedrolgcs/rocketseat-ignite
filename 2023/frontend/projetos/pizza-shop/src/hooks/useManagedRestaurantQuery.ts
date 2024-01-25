import { useQuery } from '@tanstack/react-query'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'

export const USE_MANAGED_RESTAURANT_QUERY_KEY = 'managed-restaurant'

export type usManagedRestaurantQueryKey = [
  typeof USE_MANAGED_RESTAURANT_QUERY_KEY,
]

export const useManagedRestaurantQuery = () => {
  return useQuery({
    queryKey: [USE_MANAGED_RESTAURANT_QUERY_KEY],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })
}
