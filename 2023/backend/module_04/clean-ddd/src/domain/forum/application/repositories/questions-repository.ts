import { Question } from '@/domain/forum/enterprise/entities'

interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
}

export { QuestionsRepository }
