import { describe, it, expect, beforeEach } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from '@/test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from '@/test/repositories/in-memory'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments-use-case'

let sut: FetchQuestionCommentsUseCase
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository

describe('FetchQuestionComments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    await Promise.all([
      inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
        }),
      ),

      inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
        }),
      ),

      inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-2'),
        }),
      ),
    ])

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questionComments).toHaveLength(2)
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questionComments).toHaveLength(2)
  })
})
