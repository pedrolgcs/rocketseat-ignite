import bcrypt from 'bcryptjs'
import { AddressProvider } from '@/containers/providers/AddressProvider/address-provider'
import * as Error from '@/errors/shared'
import { Organization } from '@/modules/organization/entities'
import { OrganizationsRepository } from '@/modules/organization/repositories'

type Request = {
  name: string
  email: string
  password: string
  cep: string
  address: string
  latitude: number
  longitude: number
  phone: string
}

type Response = {
  organization: Organization
}

class CreateOrganizationUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private addressProvider: AddressProvider,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { name, email, phone, password, address, cep, latitude, longitude } =
      request

    const organizationByEmail = await this.organizationsRepository.findByEmail(
      email,
    )

    if (organizationByEmail) {
      throw new Error.EmailAlreadyBeTaken()
    }

    const addressByCep = await this.addressProvider.searchAddressByCep(cep)

    const passwordHash = await bcrypt.hash(password, 6)

    const organization = Organization.create({
      name,
      email,
      phone,
      passwordHash,
      address,
      cep,
      latitude,
      longitude,
      city: addressByCep.city,
      state: addressByCep.state,
    })

    await this.organizationsRepository.create(organization)

    return {
      organization,
    }
  }
}

export { CreateOrganizationUseCase }
