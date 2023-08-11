import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

type Request = {
  page: number
}

type Response = {
  questions: Question[]
}

class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { page } = request

    const questions = await this.questionsRepository.findManyRecent({
      page,
    })

    return {
      questions,
    }
  }
}

export { FetchRecentQuestionsUseCase }
