import { api } from '@/http/api-client'

export type RemoveMemberParams = {
  organizationSlug: string
  memberId: string
}

type RemoveMemberResponse = void

export async function removeMember(params: RemoveMemberParams) {
  const { organizationSlug, memberId } = params

  const result = await api
    .delete(`organizations/${organizationSlug}/members/${memberId}`)
    .json<RemoveMemberResponse>()

  return result
}
