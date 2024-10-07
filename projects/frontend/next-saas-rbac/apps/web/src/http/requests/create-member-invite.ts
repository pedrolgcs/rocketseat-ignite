import type { Role } from '@saas/auth'

import { api } from '@/http/api-client'

export type CreateMemberInviteParams = {
  name: string
  email: string
  role: Role
  organization: string
}

export type CreateMemberInviteResponse = {
  inviteId: string
}

export async function createMemberInvite(params: CreateMemberInviteParams) {
  const { name, email, role, organization } = params

  const result = await api
    .post(`organizations/${organization}/invites`, {
      json: {
        name,
        email,
        role,
      },
    })
    .json<CreateMemberInviteResponse>()

  return result
}
