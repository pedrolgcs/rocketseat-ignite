import type { FastifyInstance } from 'fastify'

import { authenticateWithGithub } from './auth/authenticate-with-github'
import { authenticateWithPassword } from './auth/authenticate-with-password'
import { createAccount } from './auth/create-account'
import { getProfile } from './auth/get-profile'
import { requestPasswordRecovery } from './auth/request-password-recovery'
import { resetPassword } from './auth/reset-password'
import { createOrganization } from './orgs/create-organization'
import { getMembership } from './orgs/get-membership'
import { getOrganization } from './orgs/get-organization'
import { getOrganizations } from './orgs/get-organizations'

export async function routes(app: FastifyInstance) {
  // auth
  getProfile(app)
  createAccount(app)
  authenticateWithPassword(app)
  requestPasswordRecovery(app)
  authenticateWithGithub(app)
  resetPassword(app)

  // orgs
  getOrganization(app)
  getOrganizations(app)
  createOrganization(app)
  getMembership(app)
}
