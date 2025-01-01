import z from 'zod'

import { prisma } from '@/lib/prisma'
import { FastifyTypedInstance } from '@/types/fastify'

const bodySchema = z.object({
  email: z.string().email(),
})

export async function requestPasswordRecovery(app: FastifyTypedInstance) {
  app.post(
    '/password/recover',
    {
      schema: {
        operationId: 'requestPasswordRecovery',
        tags: ['Auth'],
        summary: 'Request password recovery',
        body: bodySchema,
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!userFromEmail) {
        return reply.status(201).send()
      }

      const { id: code } = await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVER',
          userId: userFromEmail.id,
        },
      })

      console.log('code', code)

      return reply.status(201).send()
    },
  )
}
