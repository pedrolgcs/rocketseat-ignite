import { Answer } from '@/domain/forum/enterprise/entities'
import { AnswersRepository } from '../answers-repository'

class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }
}

export { InMemoryAnswersRepository }
