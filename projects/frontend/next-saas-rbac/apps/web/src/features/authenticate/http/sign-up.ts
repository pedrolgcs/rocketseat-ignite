import { api } from '@/http/api-client'

export type SignUpRequest = {
  name: string
  email: string
  password: string
}

export type SignUpResponse = void

export async function signUp(params: SignUpRequest) {
  const { name, email, password } = params

  await api
    .post('users', {
      json: {
        name,
        email,
        password,
      },
    })
    .json<SignUpResponse>()
}
