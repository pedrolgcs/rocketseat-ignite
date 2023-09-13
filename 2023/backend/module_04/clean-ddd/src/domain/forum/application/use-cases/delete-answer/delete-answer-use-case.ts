import { Either, left, right } from '@/core/either'
import {
  AnswersRepository,
  AnswerAttachmentsRepository,
} from '@/domain/forum/application/repositories'
import { NotAllowedError, ResourceNotFoundError } from '../_errors'

type Request = {
  authorId: string
  answerId: string
}

type Response = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

class DeleteAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { answerId, authorId } = request

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await Promise.all([
      this.answersRepository.delete(answerId),
      this.answerAttachmentsRepository.deleteManyByAnswerId(answerId),
    ])

    return right({})
  }
}

export { DeleteAnswerUseCase }
