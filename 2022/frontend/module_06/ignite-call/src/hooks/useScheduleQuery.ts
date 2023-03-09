import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'

type Availability = {
  possibleTimes: Array<number>
  availableTimes: Array<number>
}

type UseQueryAvailabilityByDateParams = {
  date: Date | null
  username: string
}

export const useQueryAvailabilityByDate = ({
  date,
  username,
}: UseQueryAvailabilityByDateParams) => {
  const selectedDateWithoutTime = date ? dayjs(date).format('YYYY-MM-DD') : null

  return useQuery<Availability>(
    ['availability', selectedDateWithoutTime, username],
    async () => {
      const { data } = await api.get<Availability>(
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
      staleTime: 1000 * 60 * 60 * 3, // 3 hours
      enabled: !!date,
    },
  )
}

// ----------------------------------------------------

type BlockedDates = {
  blockedWeekDays: Array<number>
}

type UseQueryBlockedDatesByDateParams = {
  username: string
  year: number
  month: number
}

export const useQueryBlockedDatesByDate = ({
  username,
  year,
  month,
}: UseQueryBlockedDatesByDateParams) => {
  return useQuery<BlockedDates>(
    ['blocked-dates', year, month, username],
    async () => {
      const { data } = await api.get<BlockedDates>(
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
      staleTime: 1000 * 60 * 60 * 3, // 3 hours
      enabled: true,
    },
  )
}
