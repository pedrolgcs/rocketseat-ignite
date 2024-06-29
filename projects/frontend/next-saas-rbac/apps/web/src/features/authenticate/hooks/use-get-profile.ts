import { useQuery } from '@/hooks/use-query'

import { getProfile, type GetProfileResponse } from '../http/get-profile'

export function useGetProfile() {
  return useQuery<GetProfileResponse>({
    httpRequest: getProfile,
  })
}
