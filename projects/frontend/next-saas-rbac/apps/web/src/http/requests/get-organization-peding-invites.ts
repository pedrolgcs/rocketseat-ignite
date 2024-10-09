import { Role } from '@saas/auth'

import { api } from '../api-client'

export type GetOrganizationPendingInvitesResponse = {
  invites: Array<{
    organization: {
      name: string
    }
    id: string
    email: string
    role: Role
    createdAt: string
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }>
}

export async function getOrganizationPendingInvites() {
  const result = await api
    .get('pending-invites', {
      next: {
        tags: ['organization_pending_invites'],
        revalidate: 60 * 30, // 30 minutes
      },
    })
    .json<GetOrganizationPendingInvitesResponse>()

  return result
}
