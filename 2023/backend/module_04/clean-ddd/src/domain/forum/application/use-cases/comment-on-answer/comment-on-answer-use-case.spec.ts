import { describe, it, expect, beforeEach } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@/test/factories'
import {
  InMemoryAnswersRepository,
  InMemoryAnswerCommentsRepository,
} from '@/test/repositories/in-memory'
import { ResourceNotFoundError } from '../_errors'
import { CommentOnAnswerUseCase } from './comment-on-answer-use-case'

let sut: CommentOnAnswerUseCase
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository

describe('CommentOnAnswer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on a answer', async () => {
    const answer = makeAnswer({}, new UniqueEntityID('question-1'))

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-1',
      content: 'how are you?',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'how are you?',
    )
  })

  it('should not be able to comment on non existent answer', async () => {
    const result = await sut.execute({
      answerId: 'non-existent-answer',
      authorId: 'author-1',
      content: 'how are you?',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
