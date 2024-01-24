import { api } from '@/lib/axios'

type UpdateProfileParams = {
  name: string
  description: string | null
}

export async function updateProfile(params: UpdateProfileParams) {
  const { name, description } = params

  await api.put('/profile', {
    name,
    description,
  })
}
