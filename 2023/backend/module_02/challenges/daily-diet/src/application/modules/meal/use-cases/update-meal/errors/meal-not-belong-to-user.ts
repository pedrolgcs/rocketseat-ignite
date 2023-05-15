import { AppError } from '@/application/errors/AppError'

export class MealNotBelongToUser extends AppError {
  constructor() {
    super({
      friendlyMessage: 'Refeição não pertence ao usuário',
      message: 'meal not belong to user',
      formError: null,
      statusCode: 401,
    })
  }
}
