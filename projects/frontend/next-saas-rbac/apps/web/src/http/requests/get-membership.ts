import { Role } from '@saas/auth'

import { api } from '@/http/api-client'

export type GetMembershipParams = {
  slug: string
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
  const { slug } = params

  const result = await api
    .get(`organizations/${slug}/membership`, {
      next: {
        tags: [`${slug}_membership`],
      },
    })
    .json<GetMembershipResponse>()

  return result
}
