import type { Role } from '@saas/auth'

import { api } from '@/http/api-client'

export type CreateMemberInviteParams = {
  email: string
  role: Role
  organization: string
}

export type CreateMemberInviteResponse = void

export async function createMemberInvite(params: CreateMemberInviteParams) {
  const { email, role, organization } = params

  const result = await api
    .post(`/organizations/${organization}/members/invites`, {
      json: {
        email,
        role,
      },
    })
    .json<CreateMemberInviteResponse>()

  return result
}
