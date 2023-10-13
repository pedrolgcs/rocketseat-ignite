import { UseCaseError } from '@/core/errors/use-case-error'

class QuestionAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Question "${identifier}" already exists`)
  }
}

export { QuestionAlreadyExistsError }
