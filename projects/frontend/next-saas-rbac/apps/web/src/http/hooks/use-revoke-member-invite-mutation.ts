import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  USE_GET_ORGANIZATION_INVITES,
  type UseGetOrganizationInvitesQueryKey,
} from '@/http/hooks/use-get-organization-invites'
import type { GetOrganizationInvitesResponse } from '@/http/requests/get-organization-invites'

import {
  revokeMemberInvite,
  RevokeMemberInviteParams,
} from '../requests/revoke-member-invite'

export function useRevokeMemberInviteMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: RevokeMemberInviteParams) =>
      revokeMemberInvite(params),
    onSuccess(_, params) {
      const getOrganizationsInvitesKey: UseGetOrganizationInvitesQueryKey = [
        USE_GET_ORGANIZATION_INVITES,
        params.organizationSlug,
      ]

      queryClient.setQueriesData<GetOrganizationInvitesResponse>(
        {
          queryKey: getOrganizationsInvitesKey,
          exact: true,
        },
        (cache) => {
          if (!cache) return

          const updatedInvitesCache = cache.invites.filter(
            (invite) => invite.id !== params.inviteId,
          )

          return {
            invites: updatedInvitesCache,
          }
        },
      )
    },
  })
}
