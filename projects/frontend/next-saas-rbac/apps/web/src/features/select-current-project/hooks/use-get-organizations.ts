import { useQuery } from '@tanstack/react-query'

import {
  getOrganizations,
  type GetOrganizationsResponse,
} from '@/http/requests/get-organizations'

export const USE_GET_ORGANIZATIONS_QUERY_KEY = 'organizations'

export type UseGetOrderDetailsQueryKey = [
  typeof USE_GET_ORGANIZATIONS_QUERY_KEY,
]

export function useGetOrganizationsQuery() {
  return useQuery<GetOrganizationsResponse>({
    queryKey: [USE_GET_ORGANIZATIONS_QUERY_KEY],
    queryFn: () => getOrganizations(),
    staleTime: Infinity,
  })
}
