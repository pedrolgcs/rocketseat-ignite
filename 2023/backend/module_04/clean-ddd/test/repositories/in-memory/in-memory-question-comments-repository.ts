import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/'
import { QuestionComment } from '@/domain/forum/enterprise/entities'

class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }

  async delete(id: string): Promise<void> {
    const questionCommentIndex = this.items.findIndex(
      (item) => item.id.toString() === id,
    )

    if (questionCommentIndex >= 0) {
      this.items.splice(questionCommentIndex, 1)
    }
  }
}

export { InMemoryQuestionCommentsRepository }
