import { compare } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAddressProvider } from '@/containers/providers/AddressProvider/in-memory/in-memory-address-provider'
import * as Error from '@/errors/shared'
import { InMemoryOrganizationsRepository } from '@/modules/organization/repositories/in-memory'
import { CreateOrganizationUseCase } from './create-organization-use-case'

let sut: CreateOrganizationUseCase
let organizationsRepository: InMemoryOrganizationsRepository
let addressProvider: InMemoryAddressProvider

describe('[Organization] Create organization', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    addressProvider = new InMemoryAddressProvider()
    sut = new CreateOrganizationUseCase(
      organizationsRepository,
      addressProvider,
    )
  })

  it('should be able to create a new organization', async () => {
    const { organization } = await sut.execute({
      name: 'any name',
      email: 'organization@gmail.com',
      phone: 'any phone',
      password: 'any password',
      address: 'any address',
      cep: 'any cep',
      latitude: 1,
      longitude: 1,
    })

    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'any name',
        email: 'organization@gmail.com',
      }),
    )
  })

  it('should be able to search a address by cep', async () => {
    const { organization } = await sut.execute({
      name: 'any name',
      email: 'organization@gmail.com',
      phone: 'any phone',
      password: 'any password',
      address: 'any address',
      cep: 'any cep',
      latitude: 1,
      longitude: 1,
    })

    expect(organization).toEqual(
      expect.objectContaining({
        state: 'state',
        city: 'city',
      }),
    )
  })

  it('should be able to hash a password', async () => {
    const password = 'any_password'

    const { organization } = await sut.execute({
      name: 'any name',
      email: 'organization@gmail.com',
      phone: 'any phone',
      password,
      address: 'any address',
      cep: 'any cep',
      latitude: 1,
      longitude: 1,
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      organization.passwordHash,
    )

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to create a organization if email already be taken', async () => {
    const email = 'organization@gmail.com'

    await sut.execute({
      name: 'any name',
      email,
      phone: 'any phone',
      password: 'any password',
      address: 'any address',
      cep: 'any cep',
      latitude: 1,
      longitude: 1,
    })

    await expect(() =>
      sut.execute({
        name: 'any name',
        email,
        phone: 'any phone',
        password: 'any password',
        address: 'any address',
        cep: 'any cep',
        latitude: 1,
        longitude: 1,
      }),
    ).rejects.toBeInstanceOf(Error.EmailAlreadyBeTaken)
  })
})
