import { AppError } from '@/application/errors/AppError'

export class MealNotFound extends AppError {
  constructor() {
    super({
      friendlyMessage: 'Refeição não encontrada',
      message: 'meal not found',
      formError: null,
      statusCode: 400,
    })
  }
}
