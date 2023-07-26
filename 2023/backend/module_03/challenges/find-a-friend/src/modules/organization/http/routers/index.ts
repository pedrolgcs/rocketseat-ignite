import { FastifyInstance } from 'fastify'
import {
  CreateOrganizationController,
  AuthenticateOrganizationController,
} from '../controllers'

const createOrganizationController = new CreateOrganizationController()
const authenticateOrganizationController =
  new AuthenticateOrganizationController()

async function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', createOrganizationController.handler)

  app.post('/organizations/sign-in', authenticateOrganizationController.handler)
}

export { organizationRoutes }
