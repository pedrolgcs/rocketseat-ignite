import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
import { prisma } from '@/lib/prisma'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { method } = request

  switch (method) {
    case 'POST':
      const { name, username } = request.body

      const userExists = await prisma.user.findUnique({
        where: {
          username,
        },
      })

      if (userExists) {
        return response.status(400).json({
          friendlyMessage: 'Ops, esse nome de usuário já está em uso!',
          error: {
            message: 'Username already taken',
          },
        })
      }

      const user = await prisma.user.create({
        data: {
          name,
          username,
        },
      })

      setCookie({ res: response }, '@ignitecall:userId', user.id, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return response.status(201).json({ user })
    default:
      response.setHeader('Allow', ['GET'])
      response.status(405).end(`Method ${method} Not Allowed`)
  }
}
