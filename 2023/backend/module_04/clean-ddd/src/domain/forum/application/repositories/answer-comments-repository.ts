import { AnswerComment } from '@/domain/forum/enterprise/entities'

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  create(answerComment: AnswerComment): Promise<void>
  delete(id: string): Promise<void>
}
