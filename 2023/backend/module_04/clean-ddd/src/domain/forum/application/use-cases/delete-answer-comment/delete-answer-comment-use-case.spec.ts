import { describe, it, expect, beforeEach } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from '@/test/factories'
import { InMemoryAnswerCommentsRepository } from '@/test/repositories/in-memory'
import { DeleAnswerCommentUseCase } from './delete-answer-comment-use-case'

let sut: DeleAnswerCommentUseCase
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository

describe('DeleQuestionComment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete an answer comment', async () => {
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-comment-1'),
    )

    await inMemoryAnswerCommentsRepository.create(newAnswerComment)

    await sut.execute({
      authorId: 'author-1',
      answerCommentId: 'answer-comment-1',
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an answer comment from another user', async () => {
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-comment-1'),
    )

    await inMemoryAnswerCommentsRepository.create(newAnswerComment)

    await expect(
      sut.execute({
        authorId: 'another-author',
        answerCommentId: 'answer-comment-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
