import { FastifyInstance } from 'fastify'
import {
  CreateCheckInController,
  ValidateCheckIn,
  UserCheckInsHistoryController,
  UserMetrics,
} from '@/http/controllers/check-ins'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

const createCheckInController = new CreateCheckInController()
const validateCheckInController = new ValidateCheckIn()
const userCheckInsHistoryController = new UserCheckInsHistoryController()
const userMetricsController = new UserMetrics()

async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', userCheckInsHistoryController.handler)

  app.get('/check-ins/metrics', userMetricsController.handler)

  app.post('/gyms/:gymId/check-ins', createCheckInController.handler)

  app.patch('/check-ins/:checkInId/validate', validateCheckInController.handler)
}

export { checkInsRoutes }
