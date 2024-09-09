import { Role } from '@saas/auth'

import { api } from '../api-client'

export type GetOrganizationBySlugParams = {
  slug: string
}

export type GetOrganizationBySlugResponse = {
  organization: {
    slug: string
    id: string
    name: string
    role: Role
    domain?: string | null
    shouldAttachUsersByDomain: boolean
    avatarUrl?: string | null
  }
}

export async function getOrganizationBySlug(
  params: GetOrganizationBySlugParams,
) {
  const { slug } = params

  const result = await api
    .get(`organizations/${slug}`, {
      next: {
        tags: [`organizations_${slug}`],
      },
    })
    .json<GetOrganizationBySlugResponse>()

  return result
}
