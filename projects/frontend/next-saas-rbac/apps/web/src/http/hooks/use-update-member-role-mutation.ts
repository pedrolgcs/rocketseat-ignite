import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { GetMembersResponse } from '../requests/get-members'
import {
  updateMemberRole,
  updateMemberRoleParams,
} from '../requests/update-member-role'
import {
  USE_GET_ORGANIZATION_MEMBERS_QUERY_KEY,
  type UseGetOrganizationMembersQueryKey,
} from './use-get-members'

export function useUpdateMemberRoleMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: updateMemberRoleParams) => updateMemberRole(params),
    onSuccess(_, params) {
      const getOrganizationMemberKey: UseGetOrganizationMembersQueryKey = [
        USE_GET_ORGANIZATION_MEMBERS_QUERY_KEY,
        params.organizationSlug,
      ]

      queryClient.setQueriesData<GetMembersResponse>(
        {
          queryKey: getOrganizationMemberKey,
          exact: true,
        },
        (cache) => {
          if (!cache) return

          const updatedMembersCache = cache.members.map((member) => {
            if (member.id === params.memberId) {
              return {
                ...member,
                role: params.role,
              }
            }

            return member
          })

          return {
            members: updatedMembersCache,
          }
        },
      )
    },
  })
}
