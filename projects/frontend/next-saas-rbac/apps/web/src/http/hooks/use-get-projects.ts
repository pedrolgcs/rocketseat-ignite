import { useQuery } from '@tanstack/react-query'

import { getProjects, type GetProjectsParams } from '../requests/get-projects'

export const USE_GET_PROJECTS_QUERY_KEY = 'organization-projects'

export type UseGetProjectsQueryKey = [
  typeof USE_GET_PROJECTS_QUERY_KEY,
  slug: string,
]

export function useGetProjectsQuery(params: GetProjectsParams) {
  return useQuery({
    queryKey: [USE_GET_PROJECTS_QUERY_KEY, params.organizationSlug],
    queryFn: () => getProjects(params),
    staleTime: Infinity,
    enabled: !!params.organizationSlug,
    select(data) {
      return data.projects
    },
  })
}
