import { compare } from 'bcryptjs'
import * as Error from '@/errors/shared'
import { Organization } from '@/modules/organization/entities'
import { OrganizationsRepository } from '@/modules/organization/repositories'

type Request = {
  email: string
  password: string
}

type Response = {
  organization: Organization
}

class AuthenticateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { email, password } = request

    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new Error.InvalidCredentials()
    }

    const doesPasswordMatches = await compare(
      password,
      organization.passwordHash,
    )

    if (!doesPasswordMatches) {
      throw new Error.InvalidCredentials()
    }

    return {
      organization,
    }
  }
}

export { AuthenticateOrganizationUseCase }
