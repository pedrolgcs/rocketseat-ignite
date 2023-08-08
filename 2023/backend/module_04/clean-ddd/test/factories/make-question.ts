import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question, QuestionProps } from '@/domain/forum/enterprise/entities'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: 'example question',
    content: 'example question',
    ...override,
  })

  return question
}
