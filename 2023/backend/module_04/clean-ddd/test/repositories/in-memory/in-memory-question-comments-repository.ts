import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/'
import { QuestionComment } from '@/domain/forum/enterprise/entities'

class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }
}

export { InMemoryQuestionCommentsRepository }
