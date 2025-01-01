import { compare } from 'bcryptjs'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { FastifyTypedInstance } from '@/types/fastify'

import { BadRequestError } from '../_errors/bad-request-error'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function authenticateWithPassword(app: FastifyTypedInstance) {
  app.post(
    '/sessions/password',
    {
      schema: {
        operationId: 'authenticateWithPassword',
        tags: ['Auth'],
        summary: 'Authenticate with e-mail and password',
        body: bodySchema,
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!userFromEmail) {
        throw new BadRequestError('invalid credentials.')
      }

      if (userFromEmail.passwordHash === null) {
        throw new BadRequestError(
          'user does not have a password, use social login.',
        )
      }

      const isPasswordValid = await compare(
        password,
        userFromEmail.passwordHash,
      )

      if (!isPasswordValid) {
        throw new BadRequestError('invalid credentials.')
      }

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            expiresIn: '7d',
            sub: userFromEmail.id,
          },
        },
      )

      return reply.status(200).send({
        token,
      })
    },
  )
}
