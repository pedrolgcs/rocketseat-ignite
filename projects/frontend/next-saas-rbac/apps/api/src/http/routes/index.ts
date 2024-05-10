import type { FastifyInstance } from 'fastify'

import { authenticateWithPassword } from './auth/authenticate-with-password'
import { createAccount } from './auth/create-account'

export async function routes(app: FastifyInstance) {
  createAccount(app)
  authenticateWithPassword(app)
}
