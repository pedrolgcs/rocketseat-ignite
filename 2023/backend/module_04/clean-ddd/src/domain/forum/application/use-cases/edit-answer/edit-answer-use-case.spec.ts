import { describe, it, expect, beforeEach } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@/test/factories'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory'
import { EditAnswerUseCase } from './edit-answer-use-case'

let sut: EditAnswerUseCase
let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('EditAnswer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit an answer', async () => {
    const newAnswer = makeAnswer(
      {
        content: 'Question response',
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
      content: 'updated content',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'updated content',
    })
  })

  it('should not be able to edit an answer if not exists', async () => {
    const newAnswer = makeAnswer(
      {
        content: 'Question response',
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(
      sut.execute({
        authorId: 'author-1',
        answerId: 'non-existent',
        content: 'updated content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to edit an answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        content: 'Question response',
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(
      sut.execute({
        authorId: 'another-author',
        answerId: 'answer-1',
        content: 'updated content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
