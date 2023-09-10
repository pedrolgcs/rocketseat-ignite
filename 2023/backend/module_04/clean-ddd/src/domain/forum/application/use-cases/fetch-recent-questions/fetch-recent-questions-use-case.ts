import { Either, right } from '@/core/either'
import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

type Request = {
  page: number
}

type Response = Either<
  null,
  {
    questions: Question[]
  }
>

class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { page } = request

    const questions = await this.questionsRepository.findManyRecent({
      page,
    })

    return right({
      questions,
    })
  }
}

export { FetchRecentQuestionsUseCase }
