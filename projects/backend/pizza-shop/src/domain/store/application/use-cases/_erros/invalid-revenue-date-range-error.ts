import { UseCaseError } from '@/core/errors/use-case-error'

type Props = {
  friendlyMessage: string
}

export class InvalidRevenueDateRangeError
  extends Error
  implements UseCaseError
{
  private readonly props: Props

  constructor() {
    super('You cannot list revenue in a larger period than 7 days')
    this.props = {
      friendlyMessage:
        'Não é possível listar o relatório de vendas em um período maior que 7 dias',
    }
  }

  get friendlyMessage() {
    return this.props.friendlyMessage
  }
}
