import { useQuery } from '@tanstack/react-query'

import {
  getOrganizations,
  type GetOrganizationsResponse,
} from '../requests/get-organizations'

export const USE_GET_ORGANIZATIONS_QUERY_KEY = 'organizations'

export type UseGetOrganizationsQueryKey = [
  typeof USE_GET_ORGANIZATIONS_QUERY_KEY,
]

export function useGetOrganizationsQuery() {
  return useQuery<GetOrganizationsResponse>({
    queryKey: [USE_GET_ORGANIZATIONS_QUERY_KEY],
    queryFn: () => getOrganizations(),
    staleTime: Infinity,
  })
}
