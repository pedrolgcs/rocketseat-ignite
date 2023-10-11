import { describe, it, expect, beforeEach } from 'vitest'
import { FakeEncrypter } from '@/test/cryptography/fake-encrypter'
import { FakeHasher } from '@/test/cryptography/fake-hasher'
import { makeStudent } from '@/test/factories'
import { InMemoryStudentsRepository } from '@/test/repositories/in-memory'
import { WrongCredentialsError } from '../_errors'
import { AuthenticateStudentUseCase } from './authenticate-student-use-case'

let sut: AuthenticateStudentUseCase
let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeEncrypter: FakeEncrypter
let fakeHasher: FakeHasher

describe('AuthenticateStudent', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeEncrypter = new FakeEncrypter()
    fakeHasher = new FakeHasher()
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'jonh@example.com',
      password: await fakeHasher.hash('123456'),
    })

    await inMemoryStudentsRepository.create(student)

    const result = await sut.execute({
      email: 'jonh@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value).toEqual({
        accessToken: expect.any(String),
      })
    }
  })

  it('should not be able to authenticate a student with wrong email', async () => {
    const student = makeStudent({
      email: 'jonh@example.com',
      password: await fakeHasher.hash('123456'),
    })

    await inMemoryStudentsRepository.create(student)

    const result = await sut.execute({
      email: 'wrong-email@example.com',
      password: await fakeHasher.hash('123456'),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate a student with wrong password', async () => {
    const student = makeStudent({
      email: 'jonh@example.com',
      password: await fakeHasher.hash('123456'),
    })

    await inMemoryStudentsRepository.create(student)

    const result = await sut.execute({
      email: 'jonh@example.com',
      password: 'wrong-password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
