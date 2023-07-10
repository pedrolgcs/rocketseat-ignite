import { AppError } from '../AppError'

class SearchAddress extends AppError {
  constructor() {
    super({
      friendlyMessage: 'Erro ao consultar endereço',
      message: 'error on search address',
      statusCode: 500,
    })
  }
}

export { SearchAddress }
