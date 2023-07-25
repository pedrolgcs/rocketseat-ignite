import { describe, it, expect, beforeEach } from 'vitest'
import * as Error from '@/errors/shared'
import { OrganizationBuilder } from '@/modules/organization/helpers/builders'
import { InMemoryOrganizationsRepository } from '@/modules/organization/repositories/in-memory'
import { AuthenticateOrganizationUseCase } from './authenticate-organization-use-case'

let sut: AuthenticateOrganizationUseCase
let organizationsRepository: InMemoryOrganizationsRepository

describe('[Organization] Authenticate organization', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to authenticate an organization', async () => {
    const newOrganization = new OrganizationBuilder()
      .setPasswordHash('any_password')
      .build()

    await organizationsRepository.create(newOrganization)

    const { organization } = await sut.execute({
      email: newOrganization.email,
      password: 'any_password',
    })

    expect(organization).toBeTruthy()
  })

  it('should not be able to authenticate if wrong email', async () => {
    const newOrganization = new OrganizationBuilder().build()

    await organizationsRepository.create(newOrganization)

    await expect(() =>
      sut.execute({
        email: 'any_email@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(Error.InvalidCredentials)
  })

  it('should not be able to authenticate if wrong password', async () => {
    const newOrganization = new OrganizationBuilder()
      .setPasswordHash('any_password')
      .build()

    await organizationsRepository.create(newOrganization)

    await expect(() =>
      sut.execute({
        email: newOrganization.email,
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(Error.InvalidCredentials)
  })
})
