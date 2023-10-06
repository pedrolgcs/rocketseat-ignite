import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswersRepository } from '@/domain/forum/application/repositories'
import { AnswerCommentEvent } from '@/domain/forum/enterprise/events'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases'

class OnCommentAnswerSubscriber implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.execute.bind(this), AnswerCommentEvent.name)
  }

  private async execute(event: AnswerCommentEvent) {
    const { answerComment } = event

    const answer = await this.answersRepository.findById(
      answerComment.answerId.toString(),
    )

    if (!answer) {
      return
    }

    await this.sendNotification.execute({
      recipientId: answer.authorId.toString(),
      title: `Nova comentário em "${answer.content
        .substring(0, 40)
        .concat('...')}"`,
      content: answerComment.content.substring(0, 20).concat('...'),
    })
  }
}

export { OnCommentAnswerSubscriber }
