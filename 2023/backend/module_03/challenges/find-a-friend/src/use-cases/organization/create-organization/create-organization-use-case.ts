import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { Organization } from '@prisma/client'
import { IOrganizationsRepository } from '@/repositories'
import * as Errors from './errors'

type Request = {
  name: string
  email: string
  cep: string
  latitude: number
  longitude: number
  phone: string
  password: string
}

type Response = {
  organization: Organization
}

@injectable()
class CreateOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { name, phone, cep, email, latitude, longitude, password } = request

    const emailAlreadyTaken = await this.organizationsRepository.findByEmail(
      email,
    )

    if (emailAlreadyTaken) {
      throw new Errors.EmailAlreadyUsed()
    }

    const passwordHash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password_hash: passwordHash,
      cep,
      phone,
      latitude,
      longitude,
    })

    return {
      organization,
    }
  }
}

export { CreateOrganizationUseCase }
