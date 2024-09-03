import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  USE_GET_ORGANIZATION_BY_SLUG_QUERY_KEY,
  type UseGetOrganizationBySlugQueryKey,
} from '@/http/hooks/use-get-organization-by-slug'
import {
  USE_GET_ORGANIZATIONS_QUERY_KEY,
  type UseGetOrganizationsQueryKey,
} from '@/http/hooks/use-get-organizations'
import type { GetOrganizationBySlugResponse } from '@/http/requests/get-organization-by-slug'
import type { GetOrganizationsResponse } from '@/http/requests/get-organizations'

import {
  updateOrganization,
  UpdateOrganizationParams,
} from '../requests/update-organization'

export function useUpdateOrganizationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: UpdateOrganizationParams) =>
      updateOrganization(params),
    onSuccess(_, params) {
      const getOrganizationBySlugKey: UseGetOrganizationBySlugQueryKey = [
        USE_GET_ORGANIZATION_BY_SLUG_QUERY_KEY,
        params.organizationSlug,
      ]

      queryClient.setQueriesData<GetOrganizationBySlugResponse>(
        {
          queryKey: getOrganizationBySlugKey,
          exact: true,
        },
        (cache) => {
          if (!cache) return

          return {
            organization: {
              ...cache.organization,
              name: params.name,
              domain: params.domain,
              shouldAttachUsersByDomain: !!params.shouldAttachUsersByDomain,
            },
          }
        },
      )

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

          const updatedOrganizations = cache.organizations.map(
            (organization) => {
              if (organization.slug !== params.organizationSlug)
                return organization
              return {
                ...organization,
                name: params.name,
                domain: params.domain,
                shouldAttachUsersByDomain: !!params.shouldAttachUsersByDomain,
              }
            },
          )

          return { organizations: updatedOrganizations }
        },
      )
    },
  })
}
