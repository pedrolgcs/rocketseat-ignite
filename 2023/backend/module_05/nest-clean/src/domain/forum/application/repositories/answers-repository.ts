import { PaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '@/domain/forum/enterprise/entities'

abstract class AnswersRepository {
  abstract findById(id: string): Promise<Answer | null>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>

  abstract create(answer: Answer): Promise<void>
  abstract save(answer: Answer): Promise<void>
  abstract delete(answerId: string): Promise<void>
}

export { AnswersRepository }
