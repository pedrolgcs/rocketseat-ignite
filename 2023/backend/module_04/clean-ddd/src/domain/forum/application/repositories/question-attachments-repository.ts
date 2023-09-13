import { QuestionAttachment } from '@/domain/forum/enterprise/entities'

interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  deleteManyByQuestionId(questionId: string): Promise<void>
}

export { QuestionAttachmentsRepository }
