import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unautorized-error'

const paramsSchema = z.object({
  slug: z.string(),
  memberId: z.string().uuid(),
})

export async function removeMember(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug/members/:memberId',
      {
        schema: {
          tags: ['Members'],
          summary: 'Remove a member from an organization',
          security: [{ bearerAuth: [] }],
          params: paramsSchema,
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, memberId } = request.params

        const { id: userId } = await request.getCurrentUser()

        const { membership, organization } =
          await request.getUserMembership(slug)

        if (memberId === organization.ownerId) {
          throw new BadRequestError(
            `you're not allowed to remove owner from the organization, please transfer ownership first.`,
          )
        }

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('delete', 'User')) {
          throw new UnauthorizedError(
            `you're not allowed to remove this member from the organization.`,
          )
        }

        await prisma.member.delete({
          where: {
            id: memberId,
            organizationId: organization.id,
          },
        })

        return reply.status(204).send()
      },
    )
}
