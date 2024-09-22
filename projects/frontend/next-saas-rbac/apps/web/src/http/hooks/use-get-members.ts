import { useQuery } from '@tanstack/react-query'

import { getMembers, GetMembersParams } from '../requests/get-members'

export const USE_GET_ORGANIZATION_MEMBERS_QUERY_KEY = 'organization-members'

export type UseGetOrganizationMembersQueryKey = [
  typeof USE_GET_ORGANIZATION_MEMBERS_QUERY_KEY,
  slug: string,
]

export function useGetMembersQuery(params: GetMembersParams) {
  return useQuery({
    queryKey: [USE_GET_ORGANIZATION_MEMBERS_QUERY_KEY, params.slug],
    queryFn: () => getMembers(params),
    staleTime: Infinity,
    select(data) {
      return data.members
    },
  })
}
