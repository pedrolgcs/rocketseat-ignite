import { useQuery } from '@tanstack/react-query'

import {
  getOrganizationInvites,
  type GetOrganizationInvitesParams,
} from '../requests/get-organization-invites'

export const USE_GET_ORGANIZATION_INVITES = 'organization-invites'

export type UseGetOrganizationBySlugQueryKey = [
  typeof USE_GET_ORGANIZATION_INVITES,
  slug: string,
]

export function useGetOrganizationInvites(
  params: GetOrganizationInvitesParams,
) {
  const { organizationSlug } = params

  return useQuery({
    queryKey: [USE_GET_ORGANIZATION_INVITES, organizationSlug],
    queryFn: () => getOrganizationInvites({ organizationSlug }),
    staleTime: Infinity,
    enabled: !!organizationSlug,
    select(data) {
      return data.invites
    },
  })
}
