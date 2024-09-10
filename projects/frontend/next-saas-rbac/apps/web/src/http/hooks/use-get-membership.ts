import { useQuery } from '@tanstack/react-query'

import { getMembership, GetMembershipParams } from '../requests/get-membership'

export const USE_GET_ORGANIZATION_MEMBERSHIP_QUERY_KEY =
  'organization-membership'

export type UseGetOrganizationsQueryKey = [
  typeof USE_GET_ORGANIZATION_MEMBERSHIP_QUERY_KEY,
  slug: string,
]

export function useGetMembershipQuery(params: GetMembershipParams) {
  return useQuery({
    queryKey: [USE_GET_ORGANIZATION_MEMBERSHIP_QUERY_KEY, params.slug],
    queryFn: () => getMembership(params),
    staleTime: Infinity,
    select(data) {
      return data.membership
    },
  })
}
