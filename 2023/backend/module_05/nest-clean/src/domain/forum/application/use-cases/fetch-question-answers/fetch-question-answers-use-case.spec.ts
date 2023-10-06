import { describe, it, expect, beforeEach } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion, makeAnswer } from '@/test/factories'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers-use-case'

let sut: FetchQuestionAnswersUseCase
let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('FetchQuestionAnswers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    const question = makeQuestion()

    await Promise.all([
      inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: question.id,
        }),
      ),

      inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: question.id,
        }),
      ),

      inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('another-question'),
        }),
      ),
    ])

    const result = await sut.execute({
      questionId: question.id.toString(),
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answers).toHaveLength(2)
  })

  it('should be able to fetch paginated question answers', async () => {
    const question = makeQuestion()

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: question.id,
        }),
      )
    }

    const result = await sut.execute({
      questionId: question.id.toString(),
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answers).toHaveLength(2)
  })
})
