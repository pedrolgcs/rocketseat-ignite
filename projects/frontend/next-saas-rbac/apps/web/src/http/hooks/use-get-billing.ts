import { useQuery } from '@tanstack/react-query'

import { getBilling, GetBillingParams } from '../requests/get-billing'

export const USE_GET_ORGANIZATIONS_QUERY_KEY = 'organization-billing'

export type UseGetOrganizationsQueryKey = [
  typeof USE_GET_ORGANIZATIONS_QUERY_KEY,
  slug: string,
]

export function useGetBillingQuery(params: GetBillingParams) {
  return useQuery({
    queryKey: [USE_GET_ORGANIZATIONS_QUERY_KEY, params.slug],
    queryFn: () => getBilling(params),
    staleTime: Infinity,
    select(data) {
      return data.billing
    },
  })
}
