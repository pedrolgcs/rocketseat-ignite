import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { api } from '@/lib/axios'
import { AppError } from '@/utils/Error'

type CreateSchedulingParams = {
  name: string
  email: string
  observations: string | null
  date: Date
}

export const useMutationCreateScheduling = (username: string) => {
  return useMutation(
    async (createSchedulingParams: CreateSchedulingParams) => {
      const { name, email, observations, date } = createSchedulingParams

      await api.post<void>(`/users/${username}/schedule`, {
        name,
        email,
        observations,
        date,
      })
    },
    {
      onError(err) {
        if (err instanceof AppError) {
          toast.error(err.friendlyMessage)
        }
      },
    },
  )
}
