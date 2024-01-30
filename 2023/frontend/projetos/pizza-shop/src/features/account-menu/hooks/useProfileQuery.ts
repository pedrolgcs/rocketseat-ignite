import { useQuery } from '@tanstack/react-query'

import { getProfile } from '@/features/account-menu/api/get-profile'

export const USE_PROFILE_QUERY_KEY = 'profile'

export type UseProfileQueryKey = [typeof USE_PROFILE_QUERY_KEY]

export const useProfileQuery = () => {
  return useQuery({
    queryKey: [USE_PROFILE_QUERY_KEY],
    queryFn: getProfile,
    staleTime: Infinity,
  })
}
