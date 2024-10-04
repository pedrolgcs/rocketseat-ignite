import { useQuery } from '@tanstack/react-query'

import { getProfile, type GetProfileResponse } from '../requests/get-profile'

export const USE_GET_PROFILE_KEY = 'profile'

export type UseGetProfileQueryKey = [typeof USE_GET_PROFILE_KEY]

export function useGetProfileQuery() {
  return useQuery<GetProfileResponse>({
    queryKey: [USE_GET_PROFILE_KEY],
    queryFn: () => getProfile(),
    staleTime: Infinity,
  })
}
