import { UseCaseError } from '@/core/errors/use-case-error'

class DuplicateResourceFound extends Error implements UseCaseError {
  constructor() {
    super('Duplicate resource found')
  }
}

export { DuplicateResourceFound }
