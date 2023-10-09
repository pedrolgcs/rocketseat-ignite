import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

type Request = {
  page: number
  perPage: number
}

type Response = Either<
  null,
  {
    questions: Question[]
  }
>

@Injectable()
class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { page, perPage } = request

    const questions = await this.questionsRepository.findManyRecent({
      page,
      perPage,
    })

    return right({
      questions,
    })
  }
}

export { FetchRecentQuestionsUseCase }
