import { hash } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import * as Error from './errors'
import { GetUserProfileUseCase } from './get-user-profile-use-case'

let sut: GetUserProfileUseCase
let inMemoryUsersRepository: InMemoryUsersRepository

describe('[User] - Get user profile', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe.com',
      password_hash: await hash('secret', 6),
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user).toEqual(
      expect.objectContaining({
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      }),
    )
  })

  it('should not be able to get user profile with wrong user id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'wrong_user_id',
      }),
    ).rejects.toBeInstanceOf(Error.ResourceNotFound)
  })
})
