import { api } from '../api-client'

export type SignInWithPasswordRequest = {
  email: string
  password: string
}

export type SignInWithPasswordResponse = {
  token: string
}

export async function signInWithPassword(params: SignInWithPasswordRequest) {
  const { email, password } = params

  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithPasswordResponse>()

  return result
}
