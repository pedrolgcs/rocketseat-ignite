import { FastifyInstance } from 'fastify'
import { CreatePetController, GetPetByIdController } from '../controllers'

const createPetController = new CreatePetController()
const getPetByIdController = new GetPetByIdController()

async function petRoutes(app: FastifyInstance) {
  app.post('/pets', createPetController.handler)

  app.get('/pets/:id', getPetByIdController.handler)
}

export { petRoutes }
