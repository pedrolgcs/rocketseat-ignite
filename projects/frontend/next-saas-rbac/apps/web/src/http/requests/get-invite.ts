import { Role } from '@saas/auth'

import { api } from '../api-client'

export type GetInviteParams = {
  id: string
}

export type GetInviteResponse = {
  invites: {
    organization: {
      name: string
    }
    email: string
    role: Role
    id: string
    createdAt: string
    author: {
      name: string | null
      id: string
      avatarUrl: string | null
    } | null
  }
}

export async function getInvite(params: GetInviteParams) {
  const { id } = params

  const result = await api
    .get(`/invites/${id}`, {
      next: {
        tags: [`organization_invite_${id}`],
        revalidate: 60 * 60, // 1 hour
      },
    })
    .json<GetInviteResponse>()

  return result
}
