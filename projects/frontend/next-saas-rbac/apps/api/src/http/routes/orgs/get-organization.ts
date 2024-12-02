import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'

const paramsSchema = z.object({
  slug: z.string(),
})

export async function getOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug',
      {
        schema: {
          operationId: 'getOrganization',
          tags: ['Organizations'],
          summary: 'Get details from organization',
          security: [{ bearerAuth: [] }],
          params: paramsSchema,
          response: {
            200: z.object({
              organization: z.object({
                id: z.string(),
                name: z.string(),
                slug: z.string(),
                domain: z.string().nullish(),
                avatarUrl: z.string().url().nullish(),
                shouldAttachUsersByDomain: z.boolean().optional(),
                ownerId: z.string().uuid(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params

        const { organization } = await request.getUserMembership(slug)

        return reply.status(200).send({
          organization,
        })
      },
    )
}
