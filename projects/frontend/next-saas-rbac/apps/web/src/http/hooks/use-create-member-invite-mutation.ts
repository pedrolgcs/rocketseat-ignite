import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  createMemberInvite,
  CreateMemberInviteParams,
} from '../requests/create-member-invite'
import {
  USE_GET_ORGANIZATION_INVITES,
  type UseGetOrganizationInvitesQueryKey,
} from './use-get-organization-invites'

export function useCreateMemberInviteMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateMemberInviteParams) =>
      createMemberInvite(params),
    onSuccess(_, params) {
      const getOrganizationInvitesKey: UseGetOrganizationInvitesQueryKey = [
        USE_GET_ORGANIZATION_INVITES,
        params.organization,
      ]

      queryClient.refetchQueries({
        queryKey: getOrganizationInvitesKey,
        exact: true,
      })
    },
  })
}
