import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'
import { ResourceNotFoundError } from '../_errors'

type Request = {
  slug: string
}

type Response = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

@Injectable()
class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { slug } = request

    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question,
    })
  }
}

export { GetQuestionBySlugUseCase }
