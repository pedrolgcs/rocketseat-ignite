import { useQuery } from '@/hooks/use-query'

import {
  getOrganizations,
  type GetOrganizationsResponse,
} from '../http/get-organizations'

export async function useGetOrganizations() {
  const result = await useQuery<GetOrganizationsResponse>({
    httpRequest: getOrganizations,
  })

  return result
}
