import { useQuery } from '@tanstack/react-query'

import {
  getProjects,
  type GetProjectsParams,
  type GetProjectsResponse,
} from '../http/get-projects'

export const USE_GET_PROJECTS_QUERY_KEY = 'organization-projects'

export type UseGetOrderDetailsQueryKey = [
  typeof USE_GET_PROJECTS_QUERY_KEY,
  GetProjectsParams,
]

type Options = {
  enabled: boolean
}

export function useGetProjectsQuery(
  params: GetProjectsParams,
  options: Options,
) {
  return useQuery<GetProjectsResponse>({
    queryKey: [USE_GET_PROJECTS_QUERY_KEY, params],
    queryFn: () => getProjects(params),
    staleTime: Infinity,
    enabled: options.enabled,
  })
}
