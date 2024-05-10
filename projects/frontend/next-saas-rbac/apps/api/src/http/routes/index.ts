import type { FastifyInstance } from 'fastify'

import { authenticateWithPassword } from './auth/authenticate-with-password'
import { createAccount } from './auth/create-account'
import { getProfile } from './auth/get-profile'

export async function routes(app: FastifyInstance) {
  createAccount(app)
  authenticateWithPassword(app)
  getProfile(app)
}
