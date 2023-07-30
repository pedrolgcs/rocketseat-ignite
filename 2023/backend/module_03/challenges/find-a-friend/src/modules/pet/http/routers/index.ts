import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import {
  CreatePetController,
  GetPetByIdController,
  SearchPetsController,
  UploadPetImagesController,
} from '../controllers'

const createPetController = new CreatePetController()
const getPetByIdController = new GetPetByIdController()
const searchPetsController = new SearchPetsController()
const uploadPetImagesController = new UploadPetImagesController()

async function petRoutes(app: FastifyInstance) {
  app.get('/pets/:id', getPetByIdController.handler)

  app.get('/pets/city/:city', searchPetsController.handler)

  app.post('/pets', { onRequest: [verifyJWT] }, createPetController.handler)

  app.post(
    '/pets/:id/images',
    { onRequest: [verifyJWT] },
    uploadPetImagesController.handler,
  )
}

export { petRoutes }
