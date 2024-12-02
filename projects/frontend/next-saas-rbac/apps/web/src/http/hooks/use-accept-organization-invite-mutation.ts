import { useMutation, useQueryClient } from '@tanstack/react-query'

import { acceptInvite, AcceptInviteParams } from '../requests/accept-invite'
import type { GetOrganizationPendingInvitesResponse } from '../requests/get-organization-peding-invites'
import {
  USE_GET_ORGANIZATION_PENDING_INVITES,
  type UseGetOrganizationPendingInvitesQueryKey,
} from './use-get-organization-peding-invites'
import {
  USE_GET_ORGANIZATIONS_QUERY_KEY,
  type UseGetOrganizationsQueryKey,
} from './use-get-organizations'

export function useAcceptOrganizationInviteMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: AcceptInviteParams) => acceptInvite(params),
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
            (invite) => invite.id !== params.inviteId,
          )

          return {
            invites: updatePendingInvitesCache,
          }
        },
      )

      const getOrganizationsKey: UseGetOrganizationsQueryKey = [
        USE_GET_ORGANIZATIONS_QUERY_KEY,
      ]

      queryClient.refetchQueries({
        queryKey: getOrganizationsKey,
        exact: true,
      })
    },
  })
}
