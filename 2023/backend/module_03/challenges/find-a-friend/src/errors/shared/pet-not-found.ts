import { AppError } from '../AppError'

class PetNotFound extends AppError {
  constructor() {
    super({
      friendlyMessage: 'Pet não encontrado',
      message: 'pet not found',
      statusCode: 400,
    })
  }
}

export { PetNotFound }
