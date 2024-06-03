import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

const paramsSchema = z.object({
  inviteId: z.string(),
})

export async function rejectInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/invites/:inviteId/reject',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Reject an invite',
          params: paramsSchema,
          security: [{ bearerAuth: [] }],
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { id: userId } = await request.getCurrentUser()

        const { inviteId } = request.params

        const invite = await prisma.invite.findUnique({
          where: {
            id: inviteId,
          },
        })

        if (!invite) {
          throw new BadRequestError('invite not found or expired')
        }

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!user) {
          throw new BadRequestError('user not found')
        }

        if (invite.email !== user.email) {
          throw new BadRequestError('this invite belongs to another user')
        }

        await prisma.invite.delete({ where: { id: inviteId } })

        return reply.status(204).send()
      },
    )
}
