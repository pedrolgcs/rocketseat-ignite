import { Either, right, left } from '@/core/either'
import { AnswersRepository } from '@/domain/forum/application/repositories'
import { Answer } from '@/domain/forum/enterprise/entities'
import { NotAllowedError, ResourceNotFoundError } from '../_errors'

type Request = {
  authorId: string
  answerId: string
  content: string
}

type Response = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { authorId, answerId, content } = request

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return right({
      answer,
    })
  }
}

export { EditAnswerUseCase }
