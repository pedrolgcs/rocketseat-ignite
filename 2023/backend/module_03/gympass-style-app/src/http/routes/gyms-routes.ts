import { FastifyInstance } from 'fastify'
import {
  CreateGymController,
  SearchGymController,
  NearbyGymsController,
} from '@/http/controllers/gyms'
import { verifyJWT, verifyUserRole } from '@/http/middlewares'

const createGymController = new CreateGymController()
const searchGymController = new SearchGymController()
const nearbyGymsController = new NearbyGymsController()

async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post(
    '/gyms',
    { onRequest: [verifyUserRole('ADMIN')] },
    createGymController.handler,
  )

  app.get('/gyms/search', searchGymController.handler)

  app.get('/gyms/nearby', nearbyGymsController.handler)
}

export { gymsRoutes }
