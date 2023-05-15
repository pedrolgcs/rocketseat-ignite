import { AppError } from '@/application/errors/AppError'

export class EmailAlreadyUsed extends AppError {
  constructor() {
    super({
      friendlyMessage: 'E-mail não se encontra disponível',
      message: 'Email already used',
      formError: null,
    })
  }
}
