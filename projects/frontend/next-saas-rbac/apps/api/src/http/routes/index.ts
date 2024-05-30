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
import { shutdownOrganization } from './orgs/shutdown-organizations'
import { transferOrganization } from './orgs/transfer-organization'
import { updateOrganization } from './orgs/update-organization'
import { createProject } from './projects/create-project'
import { deleteProject } from './projects/delete-project'
import { getProject } from './projects/get-project'
import { getProjects } from './projects/get-projects'

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
  updateOrganization(app)
  getMembership(app)
  shutdownOrganization(app)
  transferOrganization(app)

  // projects
  createProject(app)
  deleteProject(app)
  getProject(app)
  getProjects(app)
}
