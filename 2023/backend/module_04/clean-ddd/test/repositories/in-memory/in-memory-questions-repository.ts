import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }
}

export { InMemoryQuestionsRepository }
