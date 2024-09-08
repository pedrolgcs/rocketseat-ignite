import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  USE_GET_ORGANIZATIONS_QUERY_KEY,
  type UseGetOrganizationsQueryKey,
} from '@/http/hooks/use-get-organizations'
import type { GetOrganizationsResponse } from '@/http/requests/get-organizations'

import {
  shutdownOrganization,
  ShutdownOrganizationParams,
} from '../requests/shutdown-organization'

export function useShutdownOrganizationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: ShutdownOrganizationParams) =>
      shutdownOrganization(params),
    onSuccess(_, params) {
      const getOrganizationsKey: UseGetOrganizationsQueryKey = [
        USE_GET_ORGANIZATIONS_QUERY_KEY,
      ]

      queryClient.setQueriesData<GetOrganizationsResponse>(
        {
          queryKey: getOrganizationsKey,
          exact: true,
        },
        (cache) => {
          if (!cache) return

          const updatedOrganizationsCache = cache.organizations.filter(
            (organization) => organization.slug !== params.organizationSlug,
          )

          return {
            organizations: updatedOrganizationsCache,
          }
        },
      )
    },
  })
}
