import { QuestionCommentsRepository } from '@/domain/forum/application/repositories'
import { QuestionComment } from '@/domain/forum/enterprise/entities'

type Request = {
  questionId: string
  page: number
}

type Response = {
  questionComments: QuestionComment[]
}

class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { questionId, page } = request

    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return {
      questionComments,
    }
  }
}

export { FetchQuestionCommentsUseCase }
