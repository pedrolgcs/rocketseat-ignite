import { useQuery } from '@tanstack/react-query'

import { getOrganizationPendingInvites } from '../requests/get-organization-peding-invites'

export const USE_GET_ORGANIZATION_PENDING_INVITES =
  'organization-pending-invites'

export type UseGetOrganizationPendingInvitesQueryKey = [
  typeof USE_GET_ORGANIZATION_PENDING_INVITES,
]

export function useGetOrganizationPendingInvitesQuery() {
  return useQuery({
    queryKey: [USE_GET_ORGANIZATION_PENDING_INVITES],
    queryFn: () => getOrganizationPendingInvites(),
    staleTime: Infinity,
    select(data) {
      return data.invites
    },
  })
}
