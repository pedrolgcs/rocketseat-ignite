import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from '@/domain/forum/application/repositories/in-memory'
import { CreateQuestionUseCase } from './create-question-use-case'

let sut: CreateQuestionUseCase
let inMemoryQuestionsRepository

describe('CreateQuestion', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create an question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'this is a new question',
      content: 'how are you?',
    })

    expect(question.id).toBeTruthy()
  })
})
