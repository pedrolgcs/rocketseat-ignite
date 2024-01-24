import { useMutation } from '@tanstack/react-query'

import { signOut } from '../api/sign-out'

export const useSignOutMutation = () => {
  return useMutation({
    mutationFn: signOut,
  })
}
