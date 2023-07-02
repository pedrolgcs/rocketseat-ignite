import { FastifyInstance } from 'fastify'
import request from 'supertest'

type Params = {
  app: FastifyInstance
  email?: string
  password?: string
}

type Response = {
  token: string
}

async function createAndAuthenticateUser(params: Params): Promise<Response> {
  const { app, email = 'johndoe@example.com', password = '123456' } = params

  await request(app.server).post('/users').send({
    name: 'John Doe',
    email,
    password,
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
