import { compare } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with e-mail and password',
        body: bodySchema,
        response: {
          400: z.object({
            message: z.string(),
          }),
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
        return reply.status(400).send({
          message: 'invalid credentials.',
        })
      }

      if (userFromEmail.passwordHash === null) {
        return reply.status(400).send({
          message: 'user does not have a password, use social login.',
        })
      }

      const isPasswordValid = await compare(
        password,
        userFromEmail.passwordHash,
      )

      if (!isPasswordValid) {
        return reply.status(400).send({
          message: 'invalid credentials.',
        })
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

      return reply.status(201).send({
        token,
      })
    },
  )
}
