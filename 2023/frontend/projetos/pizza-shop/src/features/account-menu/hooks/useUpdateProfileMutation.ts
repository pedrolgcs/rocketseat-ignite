import { useMutation, useQueryClient } from '@tanstack/react-query'

import { GetManagedRestaurantResponse } from '@/api/get-managed-restaurant'
import { USE_MANAGED_RESTAURANT_QUERY_KEY } from '@/hooks/useManagedRestaurantQuery'

import { updateProfile } from '../api/update-profile'

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfile,
    onMutate(variables) {
      const { name, description } = variables
      const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
        USE_MANAGED_RESTAURANT_QUERY_KEY,
      ])
      if (cached) {
        queryClient.setQueryData<GetManagedRestaurantResponse>(
          [USE_MANAGED_RESTAURANT_QUERY_KEY],
          {
            ...cached,
            name,
            description,
          },
        )
      }
      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        queryClient.setQueryData<GetManagedRestaurantResponse>(
          [USE_MANAGED_RESTAURANT_QUERY_KEY],
          context.previousProfile,
        )
      }
    },
  })
}
