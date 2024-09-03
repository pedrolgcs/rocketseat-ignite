import { api } from '@/http/api-client'

export type UpdateOrganizationParams = {
  organizationSlug: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain?: boolean
}

export type UpdateOrganizationResponse = void

export async function updateOrganization(params: UpdateOrganizationParams) {
  const { organizationSlug, name, domain, shouldAttachUsersByDomain } = params

  const result = await api
    .put(`organizations/${organizationSlug}`, {
      json: {
        name,
        domain,
        shouldAttachUsersByDomain,
      },
    })
    .json<UpdateOrganizationResponse>()

  return result
}
