import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID
}

class AnswerComment extends Comment<AnswerCommentProps> {
  private constructor(props: AnswerCommentProps, id?: UniqueEntityID) {
    super(props, id)
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): AnswerComment {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }

  get answerId(): UniqueEntityID {
    return this.props.answerId
  }
}

export { AnswerComment }
