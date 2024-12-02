import type { z } from 'zod'

import { api } from '../api-client'
import type { acceptInviteParams } from '../generated/api'

export type AcceptInviteParams = z.infer<typeof acceptInviteParams>

export type AcceptInviteResponse = void

export async function acceptInvite(params: AcceptInviteParams) {
  const { inviteId } = params

  const result = await api
    .post(`invites/${inviteId}/accept`)
    .json<AcceptInviteResponse>()

  return result
}
