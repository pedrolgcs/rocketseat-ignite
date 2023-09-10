import { Either, left, right } from '@/core/either'
import { AnswersRepository } from '@/domain/forum/application/repositories'
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
  constructor(private answersRepository: AnswersRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { answerId, authorId } = request

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answerId)

    return right({})
  }
}

export { DeleteAnswerUseCase }
