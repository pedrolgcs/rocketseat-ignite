import { QuestionComment } from '@/domain/forum/enterprise/entities'

interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
}

export { QuestionCommentsRepository }
