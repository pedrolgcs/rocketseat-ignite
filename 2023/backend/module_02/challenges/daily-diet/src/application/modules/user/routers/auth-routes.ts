import { FastifyInstance } from 'fastify'
import { SignInController } from '@/application/modules/user/use-cases'

const signInController = new SignInController()

async function authRoutes(app: FastifyInstance) {
  app.post('/sign-in', signInController.handle)
}

export { authRoutes }
