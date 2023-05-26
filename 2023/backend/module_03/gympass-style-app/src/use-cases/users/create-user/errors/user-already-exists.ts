import { AppError } from '@/erros/AppError'

export class UserAlreadyExists extends AppError {
  constructor() {
    super({
      message: 'E-mail already exists.',
      statusCode: 409,
    })
  }
}
