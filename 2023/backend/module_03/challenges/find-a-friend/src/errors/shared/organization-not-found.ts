import { AppError } from '../AppError'

class OrganizationNotFound extends AppError {
  constructor() {
    super({
      friendlyMessage: 'Organização não encontrada',
      message: 'organization not found',
      statusCode: 400,
    })
  }
}

export { OrganizationNotFound }
