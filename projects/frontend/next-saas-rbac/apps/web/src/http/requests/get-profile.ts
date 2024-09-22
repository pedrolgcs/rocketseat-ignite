import { api } from '@/http/api-client'

export type GetProfileResponse = {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
}

export async function getProfile() {
  const result = await api
    .get('profile', {
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ['profile'],
      },
    })
    .json<GetProfileResponse>()

  return result
}
