import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { method } = request

  switch (method) {
    case 'PUT':
      const body = updateProfileBodySchema.safeParse(request.body)

      if (!body.success) {
        const { errors } = body.error

        return response.status(400).json({
          friendlyMessage: 'Ops, existe dados inválidos!',
          errors,
        })
      }

      const session = await getServerSession(
        request,
        response,
        buildNextAuthOptions(request, response),
      )

      if (!session) {
        return response.status(401).json({
          friendlyMessage: 'Ops, usuário não está autenticado!',
        })
      }

      const { bio } = body.data

      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          bio,
        },
      })

      return response.status(204).end()
    default:
      response.setHeader('Allow', ['PUT'])
      response.status(405).end(`Method ${method} Not Allowed`)
  }
}
