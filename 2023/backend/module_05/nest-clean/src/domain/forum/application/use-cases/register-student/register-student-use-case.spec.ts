import { describe, it, expect, beforeEach } from 'vitest'
import { FakeHasher } from '@/test/container/cryptography/fake-hasher'
import { makeStudent } from '@/test/factories'
import { InMemoryStudentsRepository } from '@/test/repositories/in-memory'
import { StudentAlreadyExistsError } from '../_errors'
import { RegisterStudentUseCase } from './register-student-use-case'

let sut: RegisterStudentUseCase
let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher

describe('AuthenticateStudent', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher)
  })

  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndue@me.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()

    expect(inMemoryStudentsRepository.items).toHaveLength(1)
  })

  it('should not be able to register a new student with same email', async () => {
    await inMemoryStudentsRepository.create(
      makeStudent({
        name: 'John Doe',
        email: 'johndue@me.com',
        password: '123456',
      }),
    )

    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndue@me.com',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(StudentAlreadyExistsError)
  })
})
