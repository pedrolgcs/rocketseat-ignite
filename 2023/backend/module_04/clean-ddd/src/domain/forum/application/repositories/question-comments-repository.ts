import { QuestionComment } from '@/domain/forum/enterprise/entities'

interface QuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>
  create(questionComment: QuestionComment): Promise<void>
  delete(id: string): Promise<void>
}

export { QuestionCommentsRepository }
