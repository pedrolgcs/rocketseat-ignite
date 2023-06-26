import { AppError } from '@/erros/AppError'

export class ResourceNotFound extends AppError {
  constructor() {
    super({
      message: 'Resource not found',
      statusCode: 400,
    })
  }
}
