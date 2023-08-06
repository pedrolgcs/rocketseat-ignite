import { Question } from '@/domain/forum/enterprise/entities'
import { QuestionsRepository } from '../questions-repository'

class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }
}

export { InMemoryQuestionsRepository }
