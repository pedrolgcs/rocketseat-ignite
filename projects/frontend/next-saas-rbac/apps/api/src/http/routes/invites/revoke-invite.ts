import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'

const paramsSchema = z.object({
  slug: z.string(),
  inviteId: z.string().uuid(),
})

export async function revokeInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug/invites/:inviteId',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Revoke an invite',
          params: paramsSchema,
          security: [{ bearerAuth: [] }],
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { inviteId, slug } = request.params

        const { id: userId } = await request.getCurrentUser()

        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('delete', 'Invite')) {
          throw new BadRequestError('you are not allowed to delete an invite')
        }

        const invite = await prisma.invite.findUnique({
          where: {
            id: inviteId,
            organizationId: organization.id,
          },
        })

        if (!invite) {
          throw new BadRequestError('invite not found or expired')
        }

        await prisma.invite.delete({ where: { id: inviteId } })

        return reply.status(204).send()
      },
    )
}
