import { NextApiRequest, NextApiResponse } from 'next'
import dayjs from 'dayjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const searchAvailabilityQuerySchema = z.object({
  date: z.string(),
})

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { method } = request

  switch (method) {
    case 'GET':
      const username = String(request.query.username)

      const query = searchAvailabilityQuerySchema.safeParse(request.query)

      if (!query.success) {
        const { errors } = query.error

        return response.status(400).json({
          friendlyMessage: 'Ops, existe dados inválidos!',
          errors,
        })
      }

      const { date } = query.data

      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      })

      if (!user) {
        return response.status(400).json({
          friendlyMessage: 'Ops, usuário não encontrado!',
        })
      }

      const referenceDate = dayjs(date)

      const isPastDate = referenceDate.endOf('day').isBefore(new Date())

      if (isPastDate) {
        return response.status(200).json({
          availableTimes: [],
          possibleTimes: [],
        })
      }

      const userAvailability = await prisma.userTimeInterval.findFirst({
        where: {
          user_id: user.id,
          week_day: referenceDate.get('day'),
        },
      })

      if (!userAvailability) {
        return response.status(200).json({
          availableTimes: [],
          possibleTimes: [],
        })
      }

      const { time_start_in_minutes, time_end_in_minutes } = userAvailability

      const startHour = time_start_in_minutes / 60
      const endHour = time_end_in_minutes / 60

      const possibleTimes = Array.from({
        length: endHour - startHour,
      }).map((_, index) => {
        return startHour + index
      })

      const blockedTimes = await prisma.scheduling.findMany({
        where: {
          user_id: user.id,
          date: {
            gte: referenceDate.set('hour', startHour).toDate(),
            lte: referenceDate.set('hour', endHour).toDate(),
          },
        },
        select: {
          date: true,
        },
      })

      const availableTimes = possibleTimes.filter((time) => {
        const notExistSchedulingInTime = !blockedTimes.some(
          (blockedTime) => blockedTime.date.getHours() === time,
        )

        return notExistSchedulingInTime
      })

      return response.status(200).json({ possibleTimes, availableTimes })
    default:
      response.setHeader('Allow', ['GET'])
      response.status(405).end(`Method ${method} Not Allowed`)
  }
}
