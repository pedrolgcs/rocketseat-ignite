import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { Scheduling } from '@prisma/client'
import dayjs from 'dayjs'
import { prisma } from '@/lib/prisma'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

type Schedules = Record<string, Omit<Scheduling, 'user_id' | 'created_at'>[]>

export type GetSchedulesRouterResponse = {
  schedules: Schedules
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { method } = request

  const session = await getServerSession(
    request,
    response,
    buildNextAuthOptions(request, response),
  )

  switch (method) {
    case 'GET':
      if (!session) {
        return response.status(401).json({
          friendlyMessage: 'Ops, usuário não está autenticado!',
        })
      }

      const schedules = await prisma.scheduling.findMany({
        where: {
          user_id: session.user.id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          observations: true,
          date: true,
        },
        orderBy: {
          date: 'asc',
        },
      })

      const groupedSchedulesByDate = schedules.reduce<Schedules>(
        (acc, schedule) => {
          const key = dayjs(schedule.date).format('YYYY/MM/DD')

          if (acc[key]) {
            acc[key].push(schedule)
          } else {
            acc[key] = [schedule]
          }

          return acc
        },
        {},
      )

      return response.status(200).json({
        schedules: groupedSchedulesByDate,
      })

    default:
      response.setHeader('Allow', ['GET'])
      response.status(405).end(`Method ${method} Not Allowed`)
  }
}
