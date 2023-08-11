import { describe, it, expect, beforeEach } from 'vitest'
import { makeAnswer, makeQuestion } from '@/test/factories'
import {
  InMemoryQuestionsRepository,
  InMemoryAnswersRepository,
} from '@/test/repositories/in-memory'
import { ChooseQuestionBestAnswerUseCase } from './chosse-question-best-answer-use-case'

let sut: ChooseQuestionBestAnswerUseCase
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('ChooseQuestionBestAnswer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to choose the best answer', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    await Promise.all([
      inMemoryQuestionsRepository.create(question),
      inMemoryAnswersRepository.create(answer),
    ])

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bastAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose the best answer from another user', async () => {
    const newQuestion = makeQuestion()

    const answer = makeAnswer({
      questionId: newQuestion.id,
    })

    await Promise.all([
      inMemoryQuestionsRepository.create(newQuestion),
      inMemoryAnswersRepository.create(answer),
    ])

    await expect(() =>
      sut.execute({
        answerId: answer.id.toString(),
        authorId: 'another-author',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
