import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { GetOrganizationPendingInvitesResponse } from '../requests/get-organization-peding-invites'
import { rejectInvite, RejectInviteParams } from '../requests/reject-invite'
import {
  USE_GET_ORGANIZATION_PENDING_INVITES,
  type UseGetOrganizationPendingInvitesQueryKey,
} from './use-get-organization-peding-invites'

export function useRejectOrganizationInviteMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: RejectInviteParams) => rejectInvite(params),
    onSuccess(_, params) {
      const getPendingInvitesKey: UseGetOrganizationPendingInvitesQueryKey = [
        USE_GET_ORGANIZATION_PENDING_INVITES,
      ]

      queryClient.setQueriesData<GetOrganizationPendingInvitesResponse>(
        {
          queryKey: getPendingInvitesKey,
          exact: true,
        },
        (cache) => {
          if (!cache) return

          const updatePendingInvitesCache = cache.invites.filter(
            (invite) => invite.id !== params.id,
          )

          return {
            invites: updatePendingInvitesCache,
          }
        },
      )
    },
  })
}
