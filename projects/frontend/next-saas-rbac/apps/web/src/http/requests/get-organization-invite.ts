import { Role } from '@saas/auth'

import { api } from '../api-client'

export type GetOrganizationInviteParams = {
  id: string
}

export type GetOrganizationInviteResponse = {
  invite: {
    organization: {
      name: string
    }
    email: string
    role: Role
    id: string
    createdAt: Date
    author: {
      name: string | null
      id: string
      avatarUrl: string | null
    } | null
  }
}

export async function getOrganizationInvite(
  params: GetOrganizationInviteParams,
) {
  const { id } = params

  console.log(id)

  const result = await api
    .get(`invites/${id}`, {
      next: {
        tags: [`invite_${id}`],
        revalidate: 60 * 60, // 1 hour
      },
    })
    .json<GetOrganizationInviteResponse>()

  return result
}
