import { api } from '@/http/api-client'

export type RevokeMemberInviteParams = {
  organizationSlug: string
  inviteId: string
}

export type RevokeMemberInviteResponse = void

export async function revokeMemberInvite(params: RevokeMemberInviteParams) {
  const { organizationSlug, inviteId } = params

  const result = await api
    .delete(`organizations/${organizationSlug}/invites/${inviteId}`)
    .json<RevokeMemberInviteResponse>()

  return result
}
