import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { FastifyTypedInstance } from '@/types/fastify'
import { getUserPermissions } from '@/utils/get-user-permissions'

const paramsSchema = z.object({
  slug: z.string(),
})

export async function getOrganizationBilling(app: FastifyTypedInstance) {
  app.register(auth).get(
    '/organizations/:slug/billing',
    {
      schema: {
        operationId: 'getOrganizationBilling',
        tags: ['Billing'],
        summary: 'Get billing information from organization',
        security: [{ bearerAuth: [] }],
        params: paramsSchema,
        response: {
          200: z.object({
            billing: z.object({
              seats: z.object({
                amount: z.number(),
                unit: z.number(),
                price: z.number(),
              }),
              projects: z.object({
                amount: z.number(),
                unit: z.number(),
                price: z.number(),
              }),
              total: z.number(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { slug } = request.params

      const { id: userId } = await request.getCurrentUser()

      const { organization, membership } = await request.getUserMembership(slug)

      const { cannot } = getUserPermissions(userId, membership.role)

      if (cannot('get', 'Billing')) {
        throw new Error(
          'you are not allowed to get billing details from this organization',
        )
      }

      const [amountOfMembers, amountOfProjects] = await Promise.all([
        prisma.member.count({
          where: {
            organizationId: organization.id,
            role: { not: 'BILLING' },
          },
        }),
        prisma.project.count({
          where: {
            organizationId: organization.id,
          },
        }),
      ])

      const SEATS_UNIT_PER_MONTH = 10
      const PROJECTS_UNIT_PER_MONTH = 20

      const seatsPrice = amountOfMembers * SEATS_UNIT_PER_MONTH
      const projectsPrice = amountOfProjects * PROJECTS_UNIT_PER_MONTH
      const totalPrice = seatsPrice + projectsPrice

      return reply.status(200).send({
        billing: {
          seats: {
            amount: amountOfMembers,
            unit: SEATS_UNIT_PER_MONTH,
            price: seatsPrice,
          },
          projects: {
            amount: amountOfProjects,
            unit: PROJECTS_UNIT_PER_MONTH,
            price: projectsPrice,
          },
          total: totalPrice,
        },
      })
    },
  )
}
