import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import {
  CreatePetController,
  GetPetByIdController,
  SearchPetsController,
} from '../controllers'

const createPetController = new CreatePetController()
const getPetByIdController = new GetPetByIdController()
const searchPetsController = new SearchPetsController()

async function petRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, createPetController.handler)

  app.get('/pets/:id', getPetByIdController.handler)

  app.get('/pets/city/:city', searchPetsController.handler)
}

export { petRoutes }
