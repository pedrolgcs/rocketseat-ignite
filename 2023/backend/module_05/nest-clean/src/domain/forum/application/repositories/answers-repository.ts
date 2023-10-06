import { PaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '@/domain/forum/enterprise/entities'

interface AnswersRepository {
  findById(id: string): Promise<Answer | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
  create(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  delete(answerId: string): Promise<void>
}

export { AnswersRepository }
