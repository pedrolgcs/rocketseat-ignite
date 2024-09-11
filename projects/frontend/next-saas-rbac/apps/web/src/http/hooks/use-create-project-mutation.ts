import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createProject, CreateProjectParams } from '../requests/create-projects'
import {
  USE_GET_PROJECTS_QUERY_KEY,
  type UseGetProjectsQueryKey,
} from './use-get-projects'

export function useCreateProjectMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateProjectParams) => createProject(params),
    onSuccess(_, params) {
      const getProjectsKey: UseGetProjectsQueryKey = [
        USE_GET_PROJECTS_QUERY_KEY,
        params.organizationSlug,
      ]

      queryClient.refetchQueries({
        queryKey: getProjectsKey,
        exact: true,
      })
    },
  })
}
