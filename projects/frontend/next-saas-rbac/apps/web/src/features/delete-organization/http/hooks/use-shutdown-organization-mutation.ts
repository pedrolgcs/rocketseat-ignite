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

      const organizationsCache =
        queryClient.getQueryData<GetOrganizationsResponse>(getOrganizationsKey)

      if (!organizationsCache) return

      const updatedOrganizationsCache = organizationsCache.organizations.filter(
        (organization) => organization.slug !== params.organizationSlug,
      )

      queryClient.setQueryData(getOrganizationsKey, {
        organizations: updatedOrganizationsCache,
      })
    },
  })
}
