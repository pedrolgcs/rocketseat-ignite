import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { toast } from 'react-hot-toast'
import { api } from '@/lib/axios'
import type { GetAvailabilityRouterResponse } from '@/pages/api/users/[username]/availability.api'
import type { GetBlockedDatesRouterResponse } from '@/pages/api/users/[username]/blocked-dates.api'
import type { GetSchedulesRouterResponse } from '@/pages/api/users/schedules.api'
import { AppError } from '@/utils/Error'

type UseQueryAvailabilityByDateParams = {
  date: Date | null
  username: string
}

export const useQueryAvailabilityByDate = ({
  date,
  username,
}: UseQueryAvailabilityByDateParams) => {
  const selectedDateWithoutTime = date ? dayjs(date).format('YYYY-MM-DD') : null

  return useQuery(
    ['availability', selectedDateWithoutTime, username],
    async () => {
      const { data } = await api.get<GetAvailabilityRouterResponse>(
        `/users/${username}/availability`,
        {
          params: {
            date,
          },
        },
      )

      return data
    },
    {
      onError(err) {
        if (err instanceof AppError) {
          toast.error(err.friendlyMessage)
        }
      },
      enabled: !!date,
    },
  )
}

// ----------------------------------------------------

type UseQueryBlockedDatesByDateParams = {
  username: string
  year: string
  month: string
}

export const useQueryBlockedDatesByDate = ({
  username,
  year,
  month,
}: UseQueryBlockedDatesByDateParams) => {
  return useQuery(
    ['blocked-dates', year, month, username],
    async () => {
      const { data } = await api.get<GetBlockedDatesRouterResponse>(
        `/users/${username}/blocked-dates`,
        {
          params: {
            year,
            month,
          },
        },
      )

      return data
    },
    {
      onError(err) {
        if (err instanceof AppError) {
          toast.error(err.friendlyMessage)
        }
      },
      enabled: true,
    },
  )
}

// ----------------------------------------------------

export const useQuerySchedulesByUser = (username: string) => {
  return useQuery(
    ['schedules', username],
    async () => {
      const { data } = await api.get<GetSchedulesRouterResponse>(
        `/users/schedules`,
      )

      return data
    },
    {
      onError(err) {
        if (err instanceof AppError) {
          toast.error(err.friendlyMessage)
        }
      },
      enabled: !!username,
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  )
}
