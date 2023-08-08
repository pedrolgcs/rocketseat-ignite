import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

type Request = {
  slug: string
}

type Response = {
  question: Question
}

class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { slug } = request

    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return {
      question,
    }
  }
}

export { GetQuestionBySlugUseCase }
