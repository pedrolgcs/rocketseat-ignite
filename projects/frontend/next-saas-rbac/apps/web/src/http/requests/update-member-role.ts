import type { Role } from '@saas/auth'

import { api } from '@/http/api-client'

export type updateMemberRoleParams = {
  organizationSlug: string
  memberId: string
  role: Role
}

type UpdateMemberRoleResponse = void

export async function updateMemberRole(params: updateMemberRoleParams) {
  const { organizationSlug, memberId, role } = params

  await api
    .put(`organizations/${organizationSlug}/members/${memberId}`, {
      json: {
        role,
      },
    })
    .json<UpdateMemberRoleResponse>()
}
