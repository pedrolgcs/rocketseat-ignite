import { AppError } from '@/erros/AppError'

export class DistanceNotAllowed extends AppError {
  constructor() {
    super({
      message: 'Distance bigger than hundred meters',
      statusCode: 400,
    })
  }
}
