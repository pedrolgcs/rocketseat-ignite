import 'reflect-metadata'

import { compare } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOngRepository } from '@/repositories/in-memory'
import { CreateOngUseCase } from './create-ong-use-case'
import * as Errors from './errors'

let sut: CreateOngUseCase
let ongRepository: InMemoryOngRepository

describe('[Ong] - Create ong', () => {
  beforeEach(() => {
    ongRepository = new InMemoryOngRepository()
    sut = new CreateOngUseCase(ongRepository)
  })

  it('should be able to create a new ong', async () => {
    const { ong } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cep: '59370000',
      latitude: -23.545,
      longitude: -46.633,
      password: '123456',
      phone: '11999999999',
    })

    expect(ong).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John Doe',
        email: 'johndoe@gmail.com',
      }),
    )
  })

  it('should be able to hash ong password upon registration', async () => {
    const password = '123456'

    const { ong } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cep: '59370000',
      latitude: -23.545,
      longitude: -46.633,
      password,
      phone: '11999999999',
    })

    const isPasswordCorrectlyHashed = await compare(password, ong.password_hash)

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to create a ong if email already exists', async () => {
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
