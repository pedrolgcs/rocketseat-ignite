import { QuestionAttachment } from '@/domain/forum/enterprise/entities'

interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}

export { QuestionAttachmentsRepository }
