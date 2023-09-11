import { describe, it, expect, beforeEach } from 'vitest'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory'
import { GetQuestionBySlugUseCase } from './get-question-by-slug-use-case'

let sut: GetQuestionBySlugUseCase
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

describe('GetQuestionBySlug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a quest by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.question.id).toBeTruthy()
      expect(result.value.question.title).toEqual(newQuestion.title)
    }
  })
})
