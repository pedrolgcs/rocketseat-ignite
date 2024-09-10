import type { Role } from '@saas/auth'

import { api } from '../api-client'

export type GetMembersParams = {
  slug: string
}

export type GetMembersResponse = {
  members: Array<{
    id: string
    role: Role
    userId: string
    name: string | null
    email: string
    avatarUrl: string | null
  }>
}

export async function getMembers(params: GetMembersParams) {
  const { slug } = params

  const result = await api
    .get(`organizations/${slug}/members`, {
      next: {
        tags: [`${slug}_members`],
      },
    })
    .json<GetMembersResponse>()

  return result
}
