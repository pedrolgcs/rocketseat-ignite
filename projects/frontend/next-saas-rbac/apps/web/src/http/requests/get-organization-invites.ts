import { Role } from '@saas/auth'

import { api } from '../api-client'

export type GetOrganizationInvitesParams = {
  organizationSlug: string
}

export type GetOrganizationInvitesResponse = {
  invites: Array<{
    id: string
    email: string
    role: Role
    createdAt: string
    author: {
      id: string
      name: string | null
    } | null
  }>
}

export async function getOrganizationInvites(
  params: GetOrganizationInvitesParams,
) {
  const { organizationSlug } = params

  const result = await api
    .get(`organizations/${organizationSlug}/invites`, {
      next: {
        tags: [`${organizationSlug}_organization_invites`],
        revalidate: 60 * 60, // 1 hour
      },
    })
    .json<GetOrganizationInvitesResponse>()

  return result
}
