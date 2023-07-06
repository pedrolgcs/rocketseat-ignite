import 'reflect-metadata'

import { compare } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory'
import { CreateOrganizationUseCase } from './create-organization-use-case'
import * as Errors from './errors'

let sut: CreateOrganizationUseCase
let organizationRepository: InMemoryOrganizationsRepository

describe('[Ong] - Create ong', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('should be able to create a new ong', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cep: '59370000',
      latitude: -23.545,
      longitude: -46.633,
      password: '123456',
      phone: '11999999999',
    })

    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John Doe',
        email: 'johndoe@gmail.com',
      }),
    )
  })

  it('should be able to hash password upon registration', async () => {
    const password = '123456'

    const { organization } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cep: '59370000',
      latitude: -23.545,
      longitude: -46.633,
      password,
      phone: '11999999999',
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to create a ong if email already used', async () => {
    const email = 'johndoe@gmail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      cep: '59370000',
      latitude: -23.545,
      longitude: -46.633,
      password: '123456',
      phone: '11999999999',
    })

    await expect(async () => {
      await sut.execute({
        name: 'John Doe',
        email,
        cep: '59370000',
        latitude: -23.545,
        longitude: -46.633,
        password: '123456',
        phone: '11999999999',
      })
    }).rejects.toBeInstanceOf(Errors.EmailAlreadyUsed)
  })
})
