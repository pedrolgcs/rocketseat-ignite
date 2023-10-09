import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '@/domain/forum/enterprise/entities'

abstract class QuestionCommentsRepository {
  abstract findById(id: string): Promise<QuestionComment | null>

  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>

  abstract create(questionComment: QuestionComment): Promise<void>

  abstract delete(id: string): Promise<void>
}

export { QuestionCommentsRepository }
