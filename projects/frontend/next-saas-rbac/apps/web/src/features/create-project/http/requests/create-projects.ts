import { api } from '@/http/api-client'

export type CreateProjectParams = {
  name: string
  description: string
  organizationSlug: string
}

export type CreateProjectResponse = {
  projectId: string
}

export async function createProject(params: CreateProjectParams) {
  const { name, description, organizationSlug } = params

  const result = await api
    .post(`organizations/${organizationSlug}/projects`, {
      json: {
        name,
        description,
      },
    })
    .json<CreateProjectResponse>()

  return result
}
