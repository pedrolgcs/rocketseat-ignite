import { AppError } from '../AppError'

class EmailAlreadyBeTaken extends AppError {
  constructor() {
    super({
      friendlyMessage: 'E-mail já utilizado',
      message: 'email already be taken',
      statusCode: 400,
    })
  }
}

export { EmailAlreadyBeTaken }
