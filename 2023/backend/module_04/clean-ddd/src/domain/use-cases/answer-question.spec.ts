import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryAnswersRepository } from '../repositories/in-memory'
import { AnswerQuestion } from './answer-question'

let sut: AnswerQuestion
let inMemoryAnswersRepository

describe('AnswerQuestion', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestion(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const answer = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'new answer',
    })

    expect(answer.content).toBe('new answer')
  })
})
