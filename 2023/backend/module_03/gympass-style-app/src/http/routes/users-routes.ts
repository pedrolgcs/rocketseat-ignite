import { FastifyInstance } from 'fastify'
import { CreateUserController } from '@/http/controllers/users'

const createUserController = new CreateUserController()

async function usersRoutes(app: FastifyInstance) {
  app.post('/', createUserController.handler)
}

export { usersRoutes }
