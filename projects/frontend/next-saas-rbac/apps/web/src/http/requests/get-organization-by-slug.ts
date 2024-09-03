import { Role } from '@saas/auth'

import { api } from '../api-client'

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

export type GetOrganizationBySlugParams = {
  slug: string
}

export async function getOrganizationBySlug(
  params: GetOrganizationBySlugParams,
) {
  const { slug } = params

  const result = await api
    .get(`organizations/${slug}`)
    .json<GetOrganizationBySlugResponse>()

  return result
}
