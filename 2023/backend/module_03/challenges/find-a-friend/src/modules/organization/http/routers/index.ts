import { FastifyInstance } from 'fastify'
import { CreateOrganizationController } from '../controllers'

const createOrganizationController = new CreateOrganizationController()

async function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', createOrganizationController.handler)
}

export { organizationRoutes }
