import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { FastifyTypedInstance } from '@/types/fastify'

import { BadRequestError } from '../_errors/bad-request-error'

const paramsSchema = z.object({
  inviteId: z.string().uuid(),
})

export async function acceptInvite(app: FastifyTypedInstance) {
  app.register(auth).post(
    '/invites/:inviteId/accept',
    {
      schema: {
        operationId: 'acceptInvite',
        tags: ['Invites'],
        summary: 'Accept an invite',
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

      await prisma.$transaction([
        prisma.member.create({
          data: {
            userId,
            organizationId: invite.organizationId,
            role: invite.role,
          },
        }),
        prisma.invite.delete({ where: { id: inviteId } }),
      ])

      return reply.status(204).send()
    },
  )
}
