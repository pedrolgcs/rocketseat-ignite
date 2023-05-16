import { FastifyInstance } from 'fastify'
import { auth } from '@/application/middlewares/auth'
import {
  GetMealByIdController,
  GetMealsByUserController,
  CreateMealController,
  UpdateMealController,
  DeleteMealController,
  MealsSummaryController,
} from '@/application/modules/meal/use-cases'

const getMealsByUserController = new GetMealsByUserController()
const getMealByIdController = new GetMealByIdController()
const createMealController = new CreateMealController()
const updateMealController = new UpdateMealController()
const deleteMealController = new DeleteMealController()
const mealsSummaryController = new MealsSummaryController()

async function mealRoutes(app: FastifyInstance) {
  app.addHook('preHandler', auth)

  app.get('/', getMealsByUserController.handle)

  app.get('/:id', getMealByIdController.handle)

  app.get('/summary', mealsSummaryController.handle)

  app.post('/', createMealController.handle)

  app.put('/:id', updateMealController.handle)

  app.delete('/:id', deleteMealController.handle)
}

export { mealRoutes }
