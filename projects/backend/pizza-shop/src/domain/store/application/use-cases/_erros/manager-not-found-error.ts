import { UseCaseError } from '@/core/errors/use-case-error'

export class ManagerNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Manager not found')
  }
}
