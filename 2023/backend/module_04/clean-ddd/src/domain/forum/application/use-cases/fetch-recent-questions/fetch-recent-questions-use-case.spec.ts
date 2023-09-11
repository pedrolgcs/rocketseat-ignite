import { describe, it, expect, beforeEach } from 'vitest'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions-use-case'

let sut: FetchRecentQuestionsUseCase
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

describe('FetchRecentQuestions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await Promise.all([
      inMemoryQuestionsRepository.create(
        makeQuestion({
          createdAt: new Date(2022, 0, 1),
        }),
      ),

      inMemoryQuestionsRepository.create(
        makeQuestion({
          createdAt: new Date(2022, 0, 2),
        }),
      ),

      inMemoryQuestionsRepository.create(
        makeQuestion({
          createdAt: new Date(2022, 0, 3),
        }),
      ),
    ])

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2022, 0, 3),
      }),
      expect.objectContaining({
        createdAt: new Date(2022, 0, 2),
      }),
      expect.objectContaining({
        createdAt: new Date(2022, 0, 1),
      }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questions).toHaveLength(2)
  })
})
