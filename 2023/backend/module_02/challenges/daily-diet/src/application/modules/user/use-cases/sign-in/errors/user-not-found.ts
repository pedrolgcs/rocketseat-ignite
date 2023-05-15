import { AppError } from '@/application/errors/AppError'

export class UserNotFound extends AppError {
  constructor() {
    super({
      friendlyMessage: 'Usuário não encontrado',
      message: 'user not found',
      formError: null,
    })
  }
}
