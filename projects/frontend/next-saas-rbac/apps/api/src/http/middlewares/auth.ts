import type { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

import type { JwtToken } from '@/@types/token'
import { prisma } from '@/lib/prisma'

import { UnauthorizedError } from '../routes/_errors/unautorized-error'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUser = async () => {
      try {
        const { sub } = await request.jwtVerify<JwtToken>()

        return {
          id: sub,
        }
      } catch {
        throw new UnauthorizedError('invalid auth token.')
      }
    }

    request.getUserMembership = async (slug: string) => {
      const { id: userId } = await request.getCurrentUser()

      const member = await prisma.member.findFirst({
        where: {
          userId,
          organization: {
            slug,
          },
        },
        include: {
          organization: true,
        },
      })

      if (!member) {
        throw new UnauthorizedError(
          'user is not a member of this organization.',
        )
      }

      const { organization, ...membership } = member

      return {
        organization,
        membership,
      }
    }
  })
})
