import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { User } from '@prisma/client'
import { prisma } from '@/lib/prisma'

type Params = {
  app: FastifyInstance
  email?: string
  password?: string
  role?: Role
}

type Response = {
  user: User
  token: string
}

async function createAndAuthenticateUser(params: Params): Promise<Response> {
  const {
    app,
    email = 'johndoe@example.com',
    password = '123456',
    role = 'MEMBER',
  } = params

  const user = await prisma.user.create({
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
    user,
    token,
  }
}

export { createAndAuthenticateUser }
