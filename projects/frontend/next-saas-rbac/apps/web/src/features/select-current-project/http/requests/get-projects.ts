import { api } from '@/http/api-client'

export type GetProjectsParams = {
  organizationSlug: string
}

export type GetProjectsResponse = {
  projects: Array<{
    description: string
    slug: string
    id: string
    name: string
    avatarUrl: string | null
    organizationId: string
    ownerId: string
    createdAt: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
      email: string
    }
  }>
}

export async function getProjects(params: GetProjectsParams) {
  const { organizationSlug } = params

  const result = await api
    .get(`organizations/${organizationSlug}/projects`)
    .json<GetProjectsResponse>()

  return result
}
