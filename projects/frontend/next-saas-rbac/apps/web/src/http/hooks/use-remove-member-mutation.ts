import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { GetMembersResponse } from '../requests/get-members'
import { removeMember, RemoveMemberParams } from '../requests/remove-member'
import {
  USE_GET_ORGANIZATION_MEMBERS_QUERY_KEY,
  UseGetOrganizationMembersQueryKey,
} from './use-get-members'

export function useRemoveMemberMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: RemoveMemberParams) => removeMember(params),
    onSuccess(_, params) {
      const getMembersKey: UseGetOrganizationMembersQueryKey = [
        USE_GET_ORGANIZATION_MEMBERS_QUERY_KEY,
        params.organizationSlug,
      ]

      queryClient.setQueriesData<GetMembersResponse>(
        {
          queryKey: getMembersKey,
          exact: true,
        },
        (cache) => {
          if (!cache) return

          const updatedMembersCache = cache.members.filter(
            (member) => member.id !== params.memberId,
          )

          return {
            members: updatedMembersCache,
          }
        },
      )
    },
  })
}
