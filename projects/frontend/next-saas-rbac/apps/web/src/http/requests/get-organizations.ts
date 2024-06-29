import { Role } from '@saas/auth'

import { api } from '../api-client'

export type GetOrganizationsResponse = {
  organizations: {
    slug: string
    id: string
    name: string
    role: Role
    domain?: string | null
    avatarUrl?: string | null
  }[]
}

export async function getOrganizations() {
  const result = await api.get('organizations').json<GetOrganizationsResponse>()

  return result
}
