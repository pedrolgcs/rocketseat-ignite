import { api } from '../api-client'

export type RejectInviteParams = {
  id: string
}

export type RejectInviteResponse = void

export async function rejectInvite(params: RejectInviteParams) {
  const { id } = params

  const result = await api
    .post(`invites/${id}/reject`)
    .json<RejectInviteResponse>()

  return result
}
