import { Either, right } from '@/core/either'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories'
import { AnswerComment } from '@/domain/forum/enterprise/entities'

type Request = {
  answerId: string
  page: number
}

type Response = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { answerId, page } = request

    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({
      answerComments,
    })
  }
}

export { FetchAnswerCommentsUseCase }
