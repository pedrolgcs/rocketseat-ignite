import { NextApiRequest, NextApiResponse } from 'next'
import dayjs from 'dayjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const createSchedulingBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  observations: z.string().nullable(),
  date: z.string().datetime(),
})

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { method } = request

  switch (method) {
    case 'POST':
      const username = String(request.query.username)

      const body = createSchedulingBodySchema.safeParse(request.body)

      if (!body.success) {
        const { errors } = body.error

        return response.status(400).json({
          friendlyMessage: 'Ops, existe dados inválidos!',
          errors,
        })
      }

      const { name, email, observations, date } = body.data

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

      const schedulingDate = dayjs(date).startOf('hour')

      if (schedulingDate.isBefore(new Date())) {
        return response.status(400).json({
          friendlyMessage: 'Ops, esse data está no passado!',
        })
      }

      const conflictingScheduling = await prisma.scheduling.findFirst({
        where: {
          user_id: user.id,
          date: schedulingDate.toDate(),
        },
      })

      if (conflictingScheduling) {
        return response.status(400).json({
          friendlyMessage:
            'Ops, já existe um agendamento para o mesmo horário!',
        })
      }

      await prisma.scheduling.create({
        data: {
          name,
          email,
          date: schedulingDate.toDate(),
          observations,
          user_id: user.id,
        },
      })

      return response.status(201).end()
    default:
      response.setHeader('Allow', ['POST'])
      response.status(405).end(`Method ${method} Not Allowed`)
  }
}
