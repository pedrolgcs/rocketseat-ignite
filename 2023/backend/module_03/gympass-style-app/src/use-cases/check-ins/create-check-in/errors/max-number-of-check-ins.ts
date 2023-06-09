import { AppError } from '@/erros/AppError'

export class MaxNumberOfCheckIns extends AppError {
  constructor() {
    super({
      message: 'Max number of check-ins reached',
      statusCode: 400,
    })
  }
}
