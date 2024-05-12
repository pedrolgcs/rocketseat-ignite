import type { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

import { UnauthorizedError } from '../routes/_errors/unautorized-error'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUser = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return {
          id: sub,
        }
      } catch {
        throw new UnauthorizedError('invalid auth token.')
      }
    }
  })
})
