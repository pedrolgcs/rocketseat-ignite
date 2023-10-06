import { AnswerAttachment } from '@/domain/forum/enterprise/entities'

interface AnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}

export { AnswerAttachmentsRepository }
