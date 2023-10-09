import { Either, right } from '@/core/either'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories'
import { AnswerComment } from '@/domain/forum/enterprise/entities'

type Request = {
  answerId: string
  page: number
  perPage: number
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
    const { answerId, page, perPage } = request

    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
        perPage,
      })

    return right({
      answerComments,
    })
  }
}

export { FetchAnswerCommentsUseCase }
