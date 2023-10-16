import { Comment as PrismaComment, Prisma } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '@/domain/forum/enterprise/entities'

class PrismaQuestionCommentMapper {
  static toDomain(raw: PrismaComment): QuestionComment {
    if (!raw.questionId) {
      throw new Error('Invalid comment type.')
    }

    return QuestionComment.create(
      {
        content: raw.content,
        questionId: new UniqueEntityID(raw.questionId),
        authorId: new UniqueEntityID(raw.authorId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    question: QuestionComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: question.id.toString(),
      content: question.content,
      authorId: question.authorId.toString(),
      questionId: question.questionId.toString(),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}

export { PrismaQuestionCommentMapper }
