import { NextApiRequest, NextApiResponse } from 'next'
import dayjs from 'dayjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const searchAvailabilityQuerySchema = z.object({
  year: z.string(),
  month: z.string(),
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

      const { year, month } = query.data

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

      const availableWeekDays = await prisma.userTimeInterval.findMany({
        where: {
          user_id: user.id,
        },
        select: {
          week_day: true,
        },
      })

      const daysArray = [0, 1, 2, 3, 4, 5, 6]

      const blockedWeekDays = daysArray.filter((day) => {
        return !availableWeekDays.some(
          (availableWeekDay) => availableWeekDay.week_day === day,
        )
      })

      return response.status(200).json({ blockedWeekDays })
    default:
      response.setHeader('Allow', ['GET'])
      response.status(405).end(`Method ${method} Not Allowed`)
  }
}
