import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        operationId: 'createAccount',
        tags: ['Auth'],
        summary: 'Create an new account',
        body: bodySchema,
        response: {
          201: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (userWithSameEmail) {
        throw new BadRequestError('user with same e-mail already exists.')
      }

      const passwordHash = await hash(password, 6)

      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      })

      const [, domain] = email.split('@')

      const autoJoinOrganization = await prisma.organization.findFirst({
        where: {
          domain,
          shouldAttachUsersByDomain: true,
        },
      })

      if (autoJoinOrganization) {
        await prisma.member.create({
          data: {
            userId: user.id,
            organizationId: autoJoinOrganization.id,
            role: 'MEMBER',
          },
        })
      }

      return reply.status(201).send()
    },
  )
}
