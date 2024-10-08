import { useMutation } from '@tanstack/react-query'

import { acceptInvite, AcceptInviteParams } from '../requests/accept-invite'

export function useAcceptOrganizationInviteMutation() {
  return useMutation({
    mutationFn: (params: AcceptInviteParams) => acceptInvite(params),
  })
}
