import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID
}

class QuestionComment extends Comment<QuestionCommentProps> {
  private constructor(props: QuestionCommentProps, id?: UniqueEntityID) {
    super(props, id)
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): QuestionComment {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }

  get questionId(): UniqueEntityID {
    return this.props.questionId
  }
}

export { QuestionComment }
