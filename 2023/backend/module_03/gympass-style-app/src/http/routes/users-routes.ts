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
  /**
   * Public
   */
  app.post('/sessions', authenticateUserController.handler)
  app.post('/users', createUserController.handler)

  /**
   * Authenticated
   * example: app.addHook('preHandler', auth)
   * example: app.get('/me', { preHandler: [auth] }, getUserProfileController.handler)
   */
  app.addHook('onRequest', verifyJWT)
  app.get('/me', getUserProfileController.handler)
}

export { usersRoutes }
