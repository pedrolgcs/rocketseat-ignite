import { useQuery } from '@tanstack/react-query'

import {
  getOrganizationBySlug,
  type GetOrganizationBySlugParams,
} from '../requests/get-organization-by-slug'

export const USE_GET_ORGANIZATION_BY_SLUG_QUERY_KEY = 'organization'

export type UseGetOrganizationBySlugQueryKey = [
  typeof USE_GET_ORGANIZATION_BY_SLUG_QUERY_KEY,
  slug: string,
]

export function useGetOrganizationBySlugQuery(
  params: GetOrganizationBySlugParams,
) {
  const { slug } = params

  return useQuery({
    queryKey: [USE_GET_ORGANIZATION_BY_SLUG_QUERY_KEY, slug],
    queryFn: () => getOrganizationBySlug({ slug }),
    staleTime: Infinity,
    enabled: !!slug,
    select(data) {
      return data.organization
    },
  })
}
