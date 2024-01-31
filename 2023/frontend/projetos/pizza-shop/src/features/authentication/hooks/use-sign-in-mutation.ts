import { useMutation } from '@tanstack/react-query'

import { signIn } from '../api/sign-in'

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: signIn,
  })
}
