import { useServerQuery } from '@/hooks/use-query'

import { getProfile, type GetProfileResponse } from '../http/get-profile'

export function useGetProfile() {
  return useServerQuery<GetProfileResponse>({
    httpRequest: getProfile,
  })
}
