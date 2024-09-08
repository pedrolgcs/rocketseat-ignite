import { api } from '@/http/api-client'

export type ShutdownOrganizationParams = {
  organizationSlug: string
}

export type ShutdownOrganizationResponse = void

export async function shutdownOrganization(params: ShutdownOrganizationParams) {
  const { organizationSlug } = params

  const result = await api
    .delete(`organizations/${organizationSlug}`)
    .json<ShutdownOrganizationResponse>()

  return result
}
