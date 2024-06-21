import { api } from '@/http/api-client'

export type SignInWithGithubRequest = {
  code: string
}

export type SignInWithGithubResponse = {
  token: string
}

export async function signInWithGithub(params: SignInWithGithubRequest) {
  const { code } = params

  const result = await api
    .post('sessions/github', {
      json: {
        code,
      },
    })
    .json<SignInWithGithubResponse>()

  return result
}
