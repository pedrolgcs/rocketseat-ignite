import { ViaCepAddressProvider } from '@/containers/providers/AddressProvider/implementations/via-cep-address-provider'
import { PrismaOrganizationsRepository } from '@/modules/organization/repositories/prisma'
import { CreateOrganizationUseCase } from './create-organization-use-case'

function makeCreateOrganizationUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const addressProvider = new ViaCepAddressProvider()

  const createOrganizationUseCase = new CreateOrganizationUseCase(
    prismaOrganizationsRepository,
    addressProvider,
  )

  return createOrganizationUseCase
}

export { makeCreateOrganizationUseCase }
