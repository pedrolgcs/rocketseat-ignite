import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface QuestionAttachmentProps {
  questionId: UniqueEntityID
  attachmentId: UniqueEntityID
}

class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  private constructor(props: QuestionAttachmentProps, id?: UniqueEntityID) {
    super(props, id)
  }

  static create(
    props: QuestionAttachmentProps,
    id?: UniqueEntityID,
  ): QuestionAttachment {
    const questionAttachment = new QuestionAttachment(props, id)

    return questionAttachment
  }

  get questionId(): UniqueEntityID {
    return this.props.questionId
  }

  get attachmentId(): UniqueEntityID {
    return this.props.attachmentId
  }
}

export { QuestionAttachment }
