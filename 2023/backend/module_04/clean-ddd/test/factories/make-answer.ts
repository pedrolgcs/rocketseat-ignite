import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Answer,
  AnswerAttachmentList,
  AnswerProps,
} from '@/domain/forum/enterprise/entities'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      attachments: new AnswerAttachmentList(),
      ...override,
    },
    id,
  )

  return answer
}
