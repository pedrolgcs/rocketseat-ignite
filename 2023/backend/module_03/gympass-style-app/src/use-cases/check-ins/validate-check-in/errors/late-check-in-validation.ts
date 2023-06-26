import { AppError } from '@/erros/AppError'

export class LateCheckInValidation extends AppError {
  constructor() {
    super({
      message:
        'The check-in can only be validated until 20 minutes of its creation',
      statusCode: 400,
    })
  }
}
