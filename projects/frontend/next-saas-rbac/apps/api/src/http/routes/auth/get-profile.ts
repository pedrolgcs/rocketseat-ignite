import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { FastifyTypedInstance } from '@/types/fastify'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getProfile(app: FastifyTypedInstance) {
  app.register(auth).get(
    '/profile',
    {
      schema: {
        operationId: 'getProfile',
        tags: ['Auth'],
        summary: 'Get authenticated user profile',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              name: z.string().nullable(),
              email: z.string(),
              avatarUrl: z.string().url().nullable(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = await request.getCurrentUser()

      const user = await prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
        where: {
          id,
        },
      })

      if (!user) {
        throw new BadRequestError('user not found.')
      }

      return reply.send({ user })
    },
  )
}
