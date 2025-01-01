import { roleSchema } from '@saas/auth'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { FastifyTypedInstance } from '@/types/fastify'

import { BadRequestError } from '../_errors/bad-request-error'

const paramsSchema = z.object({
  inviteId: z.string(),
})

export async function getInvite(app: FastifyTypedInstance) {
  app.get(
    '/invites/:inviteId',
    {
      schema: {
        operationId: 'getInvite',
        tags: ['Invites'],
        summary: 'Get an invite',
        params: paramsSchema,
        response: {
          200: z.object({
            invite: z.object({
              id: z.string().uuid(),
              email: z.string().email(),
              role: roleSchema,
              createdAt: z.date(),
              author: z
                .object({
                  id: z.string().uuid(),
                  name: z.string().nullable(),
                  avatarUrl: z.string().url().nullable(),
                })
                .nullable(),
              organization: z.object({
                name: z.string(),
              }),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { inviteId } = request.params

      const invite = await prisma.invite.findUnique({
        where: {
          id: inviteId,
        },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
          organization: {
            select: {
              name: true,
            },
          },
        },
      })

      if (!invite) {
        throw new BadRequestError('invite not found or has already been used')
      }

      return reply.status(200).send({ invite })
    },
  )
}
