import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswersRepository } from '@/domain/forum/application/repositories'
import { QuestionBestAnswerChosenEvent } from '@/domain/forum/enterprise/events'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases'

class OnQuestionBestAnswerChosenSubscriber implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.execute.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async execute(event: QuestionBestAnswerChosenEvent) {
    const { question, bestAnswerId } = event

    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )

    if (!answer) {
      return
    }

    await this.sendNotification.execute({
      recipientId: answer.authorId.toString(),
      title: 'Sua resposta foi escolhida',
      content: `A resposta que você enviou em "${question.title
        .substring(0, 20)
        .concat('...')}" foi escolhida pelo autor!`,
    })
  }
}

export { OnQuestionBestAnswerChosenSubscriber }
