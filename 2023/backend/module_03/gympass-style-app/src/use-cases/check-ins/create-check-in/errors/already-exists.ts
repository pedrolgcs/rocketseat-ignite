import { AppError } from '@/erros/AppError'

export class AlreadyExists extends AppError {
  constructor() {
    super({
      message: 'Check in already exists',
      statusCode: 400,
    })
  }
}
