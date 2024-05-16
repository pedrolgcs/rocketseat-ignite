import type { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

import type { JwtToken } from '@/@types/token'

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
  })
})
