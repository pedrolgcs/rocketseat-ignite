import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory'
import { AnswerQuestionUseCase } from './answer-question-use-case'

let sut: AnswerQuestionUseCase
let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('AnswerQuestion', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'new answer',
    })

    expect(answer.content).toBe('new answer')
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
