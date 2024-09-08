import { Role } from '@saas/auth'

import { api } from '@/http/api-client'

export type GetMembershipParams = {
  organizationSlug: string
}

export type GetMembershipResponse = {
  membership: {
    id: string
    organizationId: string
    role: Role
    userId: string
  }
}

export async function getMembership(params: GetMembershipParams) {
  const { organizationSlug } = params

  const result = await api
    .get(`organizations/${organizationSlug}/membership`, {
      next: {
        tags: [`${organizationSlug}_membership`],
      },
    })
    .json<GetMembershipResponse>()

  return result
}
