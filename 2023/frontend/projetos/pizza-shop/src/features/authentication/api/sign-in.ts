import { api } from '@/lib/axios'

export type SignInParams = {
  email: string
}

export async function signIn(params: SignInParams): Promise<void> {
  const { email } = params
  await api.post('/authenticate', { email })
}
