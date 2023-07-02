import { FastifyInstance } from 'fastify'
import {
  CreateUserController,
  GetUserProfileController,
  AuthenticateUserController,
} from '@/http/controllers/users'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

const createUserController = new CreateUserController()
const getUserProfileController = new GetUserProfileController()
const authenticateUserController = new AuthenticateUserController()

async function usersRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateUserController.handler)

  app.post('/users', createUserController.handler)

  app.get('/me', { onRequest: [verifyJWT] }, getUserProfileController.handler)
}

export { usersRoutes }
