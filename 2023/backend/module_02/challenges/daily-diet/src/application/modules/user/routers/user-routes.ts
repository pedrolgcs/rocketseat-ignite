import { FastifyInstance } from 'fastify'
import { CreateUserController } from '@/application/modules/user/use-cases'

const createUserController = new CreateUserController()

async function userRoutes(app: FastifyInstance) {
  app.post('/', createUserController.handle)
}

export { userRoutes }
