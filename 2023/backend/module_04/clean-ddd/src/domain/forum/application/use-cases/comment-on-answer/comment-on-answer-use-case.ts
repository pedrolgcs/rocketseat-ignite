import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswersRepository,
  AnswerCommentsRepository,
} from '@/domain/forum/application/repositories'
import { AnswerComment } from '@/domain/forum/enterprise/entities'
import { ResourceNotFoundError } from '../_errors'

type Request = {
  authorId: string
  answerId: string
  content: string
}

type Response = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { authorId, answerId, content } = request

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: answer.id,
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}

export { CommentOnAnswerUseCase }
