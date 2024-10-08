import { useQuery } from '@tanstack/react-query'

import {
  getOrganizationInvite,
  type GetOrganizationInviteParams,
} from '../requests/get-organization-invite'

export const USE_GET_ORGANIZATION_INVITE = 'organization-invite'

export type UseGetOrganizationInvite = [
  typeof USE_GET_ORGANIZATION_INVITE,
  id: string,
]

export function useGetOrganizationInvite(params: GetOrganizationInviteParams) {
  const { id } = params

  return useQuery({
    queryKey: [USE_GET_ORGANIZATION_INVITE, id],
    queryFn: () => getOrganizationInvite({ id }),
    staleTime: 1000 * 60 * 60, // 1 hour
    select(data) {
      return data.invite
    },
    enabled: !!id,
  })
}
