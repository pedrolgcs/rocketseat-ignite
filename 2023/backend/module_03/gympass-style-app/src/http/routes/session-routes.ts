import { FastifyInstance } from 'fastify'
import { AuthenticateUserController } from '@/http/controllers/users'

const authenticateUserController = new AuthenticateUserController()

async function sessionsRoutes(app: FastifyInstance) {
  app.post('/', authenticateUserController.handler)
}

export { sessionsRoutes }
