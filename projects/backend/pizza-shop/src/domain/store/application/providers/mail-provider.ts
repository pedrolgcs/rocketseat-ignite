export type SendMailParams = {
  to: string
  text: string
}

export abstract class MailProvider {
  abstract sendEmail(params: SendMailParams): void
}
