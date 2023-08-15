import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionsRepository,
  QuestionCommentsRepository,
} from '@/domain/forum/application/repositories'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

type Request = {
  authorId: string
  questionId: string
  content: string
}

type Response = {
  questionComment: QuestionComment
}

class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { authorId, questionId, content } = request

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: question.id,
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return {
      questionComment,
    }
  }
}

export { CommentOnQuestionUseCase }
