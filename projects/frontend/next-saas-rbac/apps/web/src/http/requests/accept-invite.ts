import { api } from '../api-client'

export type AcceptInviteParams = {
  id: string
}

export type AcceptInviteResponse = void

export async function acceptInvite(params: AcceptInviteParams) {
  const { id } = params

  const result = await api
    .post(`invites/${id}/accept`)
    .json<AcceptInviteResponse>()

  return result
}
