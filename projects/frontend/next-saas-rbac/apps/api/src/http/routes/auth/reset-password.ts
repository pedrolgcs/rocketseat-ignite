import { hash } from 'bcryptjs'
import z from 'zod'

import { prisma } from '@/lib/prisma'
import { FastifyTypedInstance } from '@/types/fastify'

import { UnauthorizedError } from '../_errors/unautorized-error'

const bodySchema = z.object({
  code: z.string(),
  password: z.string().min(6),
})

export async function resetPassword(app: FastifyTypedInstance) {
  app.post(
    '/password/reset',
    {
      schema: {
        operationId: 'resetPassword',
        tags: ['Auth'],
        summary: 'Reset password',
        body: bodySchema,
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { code, password } = request.body

      console.log(code, password)

      const tokenFromCode = await prisma.token.findUnique({
        where: {
          id: code,
        },
      })

      if (!tokenFromCode) {
        throw new UnauthorizedError()
      }

      const passwordHash = await hash(password, 6)

      await prisma.$transaction([
        prisma.user.update({
          where: {
            id: tokenFromCode.userId,
          },
          data: {
            passwordHash,
          },
        }),
        prisma.token.delete({ where: { id: code } }),
      ])

      return reply.status(204).send()
    },
  )
}
