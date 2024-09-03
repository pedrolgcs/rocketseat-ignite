import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  USE_GET_ORGANIZATIONS_QUERY_KEY,
  type UseGetOrganizationsQueryKey,
} from '@/http/hooks/use-get-organizations'

import {
  createOrganization,
  CreateOrganizationParams,
} from '../requests/create-organization'

export function useCreateOrganizationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateOrganizationParams) =>
      createOrganization(params),
    onSuccess() {
      const getOrganizationsKey: UseGetOrganizationsQueryKey = [
        USE_GET_ORGANIZATIONS_QUERY_KEY,
      ]

      queryClient.refetchQueries({
        queryKey: getOrganizationsKey,
        exact: true,
      })
    },
  })
}
