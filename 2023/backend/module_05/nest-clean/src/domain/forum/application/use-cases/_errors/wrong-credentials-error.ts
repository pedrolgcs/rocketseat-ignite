import { UseCaseError } from '@/core/errors/use-case-error'

class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Credentials are not valida.')
  }
}

export { WrongCredentialsError }
