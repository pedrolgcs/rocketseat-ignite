import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { GithubProvider } from '@/http/providers/github-provider'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

const bodySchema = z.object({
  code: z.string(),
})

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/github',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with github',
        body: bodySchema,
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const { token: githubAccessToken } =
        await GithubProvider.getAccessToken(code)

      const {
        id: githubID,
        name,
        email,
        avatarUrl,
      } = await GithubProvider.getUser(githubAccessToken)

      if (!email) {
        throw new BadRequestError(
          'your github account must have a e-mail to authenticate.',
        )
      }

      let user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            avatarUrl,
          },
        })
      }

      let account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: 'GITHUB',
            userId: user.id,
          },
        },
      })

      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: 'GITHUB',
            providerAccountId: githubID,
            userId: user.id,
          },
        })
      }

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            expiresIn: '7d',
            sub: user.id,
          },
        },
      )

      return reply.status(201).send({
        token,
      })
    },
  )
}
