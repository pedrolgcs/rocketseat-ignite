import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

const bodySchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        startTimeInMinutes: z.number(),
        endTimeInMinutes: z.number(),
      }),
    )
    .refine(
      (intervals) =>
        intervals.every((interval) => {
          return interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes
        }),
      {
        message:
          'O horário de término deve ser pelo menos 1h distante do início!',
      },
    ),
})

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { method } = request

  switch (method) {
    case 'POST':
      const body = bodySchema.safeParse(request.body)

      if (!body.success) {
        const { errors } = body.error

        return response.status(400).json({
          friendlyMessage: 'Ops, existe dados inválidos!',
          errors,
        })
      }

      const session = await getServerSession(
        request,
        response,
        buildNextAuthOptions(request, response),
      )

      if (!session) {
        return response.status(401).json({
          friendlyMessage: 'Ops, usuário não está autenticado!',
        })
      }

      const { intervals } = body.data

      await prisma.userTimeInterval.createMany({
        data: intervals.map((interval) => {
          return {
            week_day: interval.weekDay,
            time_start_in_minutes: interval.startTimeInMinutes,
            time_end_in_minutes: interval.endTimeInMinutes,
            user_id: session.user.id,
          }
        }),
      })

      return response.status(201).end()
    default:
      response.setHeader('Allow', ['POST'])
      response.status(405).end(`Method ${method} Not Allowed`)
  }
}
