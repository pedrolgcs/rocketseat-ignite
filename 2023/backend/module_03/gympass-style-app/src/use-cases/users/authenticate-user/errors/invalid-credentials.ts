import { AppError } from '@/erros/AppError'

export class InvalidCredentials extends AppError {
  constructor() {
    super({
      message: 'Invalid credentials',
      statusCode: 400,
    })
  }
}
