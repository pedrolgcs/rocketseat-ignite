import { useQuery } from '@/hooks/use-query'

import {
  getOrganizations,
  type GetOrganizationsResponse,
} from '../http/get-organizations'

export function useGetOrganizations() {
  return useQuery<GetOrganizationsResponse>({
    httpRequest: getOrganizations,
  })
}
