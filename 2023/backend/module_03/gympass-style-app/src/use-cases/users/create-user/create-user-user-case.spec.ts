import { compare } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from './create-user-use-case'
import * as Error from './errors'

let createUserUseCase: CreateUserUseCase

describe('[User] - Create user', () => {
  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(new InMemoryUsersRepository())
  })

  it('should be able to create a new user', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'jhondoe.com',
      password: 'secret',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to hash user password upon registration', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'jhondoe.com',
      password: 'secret',
    })

    const isPasswordCorrectlyHashed = await compare(
      'secret',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to create a user with the same email twice', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'jhondoe.com',
      password: 'secret',
    })

    await expect(() =>
      createUserUseCase.execute({
        name: 'John Doe',
        email: 'jhondoe.com',
        password: 'secret',
      }),
    ).rejects.toBeInstanceOf(Error.UserAlreadyExists)
  })
})
