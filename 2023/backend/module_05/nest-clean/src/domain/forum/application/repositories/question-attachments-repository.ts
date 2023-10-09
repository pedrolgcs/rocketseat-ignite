import { QuestionAttachment } from '@/domain/forum/enterprise/entities'

abstract class QuestionAttachmentsRepository {
  abstract findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]>

  abstract deleteManyByQuestionId(questionId: string): Promise<void>
}

export { QuestionAttachmentsRepository }
