import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unautorized-error'

const bodySchema = z.object({
  name: z.string(),
  description: z.string(),
})

const paramsSchema = z.object({
  slug: z.string(),
})

export async function createProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/projects',
      {
        schema: {
          tags: ['Projects'],
          summary: 'Create an new project',
          security: [{ bearerAuth: [] }],
          body: bodySchema,
          params: paramsSchema,
          response: {
            201: z.object({
              projectId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { name, description } = request.body
        const { slug } = request.params

        const { id: userId } = await request.getCurrentUser()

        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Project')) {
          throw new UnauthorizedError(
            `you're not allowed to create new projects.`,
          )
        }

        const projectSlug = createSlug(name)

        const projectWithSameSlug = await prisma.project.findFirst({
          where: {
            slug: projectSlug,
            organizationId: organization.id,
          },
        })

        if (projectWithSameSlug) {
          throw new BadRequestError('project with same title already exists.')
        }

        const project = await prisma.project.create({
          data: {
            name,
            slug: projectSlug,
            description,
            organizationId: organization.id,
            ownerId: userId,
          },
        })

        return reply.status(201).send({
          projectId: project.id,
        })
      },
    )
}
