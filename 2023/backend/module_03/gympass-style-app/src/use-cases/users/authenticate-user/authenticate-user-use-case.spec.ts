import { hash } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory'
import { AuthenticateUserUseCase } from './authenticate-user-use-case'
import * as Error from './errors'

let sut: AuthenticateUserUseCase
let inMemoryUsersRepository: InMemoryUsersRepository

describe('[User] - Authenticate user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to authenticate a user', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe.com',
      password_hash: await hash('secret', 6),
    })

    const { user } = await sut.execute({
      email: 'jhondoe.com',
      password: 'secret',
    })

    expect(user).toBeTruthy()
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'jhondoe.com',
        password: 'secret',
      }),
    ).rejects.toBeInstanceOf(Error.InvalidCredentials)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe.com',
      password_hash: await hash('secret', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jhondoe.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(Error.InvalidCredentials)
  })
})
