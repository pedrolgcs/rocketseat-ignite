import { describe, it, expect, beforeEach } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from '@/test/factories'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory'
import { EditQuestionUseCase } from './edit-question-use-case'

let sut: EditQuestionUseCase
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

describe('EditQuestion', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit an question', async () => {
    const newQuestion = makeQuestion(
      {
        title: 'this is a new question',
        content: 'how are you?',
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'updated title',
      content: 'updated content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'updated title',
      content: 'updated content',
    })
  })

  it('should not be able to edit an question if not exists', async () => {
    const newQuestion = makeQuestion(
      {
        title: 'this is a new question',
        content: 'how are you?',
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(
      sut.execute({
        authorId: 'author-1',
        questionId: 'question-2',
        title: 'updated title',
        content: 'updated content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to edit an question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        title: 'this is a new question',
        content: 'how are you?',
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(
      sut.execute({
        authorId: 'author-2',
        questionId: 'question-1',
        title: 'updated title',
        content: 'updated content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
