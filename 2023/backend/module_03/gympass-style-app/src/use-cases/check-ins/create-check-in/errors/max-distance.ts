import { AppError } from '@/erros/AppError'

export class MaxDistance extends AppError {
  constructor() {
    super({
      message: 'Distance bigger than hundred meters',
      statusCode: 400,
    })
  }
}
