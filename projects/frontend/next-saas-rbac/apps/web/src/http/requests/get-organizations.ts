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
  const result = await api
    .get('organizations', {
      next: {
        tags: ['organizations'],
        revalidate: 60 * 60, // 1 hour
      },
    })
    .json<GetOrganizationsResponse>()

  return result
}
