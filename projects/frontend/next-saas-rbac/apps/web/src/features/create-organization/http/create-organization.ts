import { api } from '@/http/api-client'

export type CreateOrganizationParams = {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

export type GetMembershipResponse = void

export async function createOrganization(params: CreateOrganizationParams) {
  const { name, domain, shouldAttachUsersByDomain } = params

  const result = await api
    .post('organizations', {
      json: {
        name,
        domain,
        shouldAttachUsersByDomain,
      },
    })
    .json<GetMembershipResponse>()

  return result
}
