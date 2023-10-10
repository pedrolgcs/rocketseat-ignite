import { describe, it, expect, beforeEach } from 'vitest'
import { FakeEncrypter } from '@/test/container/cryptography/fake-encrypter'
import { FakeHasher } from '@/test/container/cryptography/fake-hasher'
import { makeStudent } from '@/test/factories'
import { InMemoryStudentsRepository } from '@/test/repositories/in-memory'
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

  it('should be able to authenticate', async () => {
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
      expect(result.value.accessToken).toEqual(expect.any(String))
    }
  })
})
