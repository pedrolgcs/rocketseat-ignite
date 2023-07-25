import { AppError } from '../AppError'

class InvalidCredentials extends AppError {
  constructor() {
    super({
      friendlyMessage: 'Credenciais inválidas',
      message: 'invalid credentials',
      statusCode: 400,
    })
  }
}

export { InvalidCredentials }
