import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '@/domain/forum/enterprise/entities'

abstract class QuestionsRepository {
  abstract findById(id: string): Promise<Question | null>

  abstract findBySlug(slug: string): Promise<Question | null>

  abstract findManyRecent(params: PaginationParams): Promise<Question[]>

  abstract create(question: Question): Promise<void>

  abstract save(question: Question): Promise<void>

  abstract delete(questionId: string): Promise<void>
}

export { QuestionsRepository }
