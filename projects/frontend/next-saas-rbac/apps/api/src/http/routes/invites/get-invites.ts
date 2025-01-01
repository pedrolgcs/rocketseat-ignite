import { roleSchema } from '@saas/auth'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { FastifyTypedInstance } from '@/types/fastify'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unautorized-error'

const paramsSchema = z.object({
  slug: z.string(),
})

export async function getInvites(app: FastifyTypedInstance) {
  app.register(auth).get(
    '/organizations/:slug/invites',
    {
      schema: {
        operationId: 'getInvites',
        tags: ['Invites'],
        summary: 'Get all organization invites',
        security: [{ bearerAuth: [] }],
        params: paramsSchema,
        response: {
          200: z.object({
            invites: z.array(
              z.object({
                id: z.string().uuid(),
                email: z.string().email(),
                role: roleSchema,
                createdAt: z.date(),
                author: z
                  .object({
                    id: z.string().uuid(),
                    name: z.string().nullable(),
                  })
                  .nullable(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { slug } = request.params

      const { id: userId } = await request.getCurrentUser()

      const { membership, organization } = await request.getUserMembership(slug)

      const { cannot } = getUserPermissions(userId, membership.role)

      if (cannot('get', 'Invite')) {
        throw new UnauthorizedError(
          `you're not allowed to get organization invites.`,
        )
      }

      const invites = await prisma.invite.findMany({
        where: {
          organizationId: organization.id,
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
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return reply.status(200).send({ invites })
    },
  )
}
