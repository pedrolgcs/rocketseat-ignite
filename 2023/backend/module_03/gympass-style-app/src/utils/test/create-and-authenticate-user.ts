import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

type Params = {
  app: FastifyInstance
  email?: string
  password?: string
  role?: Role
}

type Response = {
  token: string
}

async function createAndAuthenticateUser(params: Params): Promise<Response> {
  const {
    app,
    email = 'johndoe@example.com',
    password = '123456',
    role = 'MEMBER',
  } = params

  await prisma.user.create({
    data: {
      name: 'Jhon Doe',
      email,
      password_hash: await hash(password, 6),
      role,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password,
  })

  const { token } = authResponse.body

  return {
    token,
  }
}

export { createAndAuthenticateUser }
