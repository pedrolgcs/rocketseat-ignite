import { Question } from '@/domain/forum/enterprise/entities'

interface QuestionsRepository {
  create(question: Question): Promise<void>
}

export { QuestionsRepository }
