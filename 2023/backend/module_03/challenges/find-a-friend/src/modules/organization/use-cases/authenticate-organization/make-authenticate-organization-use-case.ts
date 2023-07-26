import { PrismaOrganizationsRepository } from '@/modules/organization/repositories/prisma'
import { AuthenticateOrganizationUseCase } from './authenticate-organization-use-case'

function makeAuthenticateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const authenticateOrganizationUseCase = new AuthenticateOrganizationUseCase(
    organizationsRepository,
  )

  return authenticateOrganizationUseCase
}

export { makeAuthenticateOrganizationUseCase }
