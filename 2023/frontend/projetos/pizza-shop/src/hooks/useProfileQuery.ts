import { useQuery } from '@tanstack/react-query'

import { getProfile } from '@/api/get-profile'

export const USE_PROFILE_QUERY_KEY = 'profile'

export const useProfileQuery = () => {
  return useQuery({
    queryKey: [USE_PROFILE_QUERY_KEY],
    queryFn: getProfile,
    staleTime: Infinity,
  })
}
