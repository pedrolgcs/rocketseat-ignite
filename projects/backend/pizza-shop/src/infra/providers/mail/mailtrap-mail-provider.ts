import nodemailer from 'nodemailer'

import {
  MailProvider,
  SendMailParams,
} from '@/domain/store/application/providers'

export class MailtrapMailProvider implements MailProvider {
  private transporter: nodemailer.Transporter
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '83bbf674c597e8',
        pass: 'b166b72e5b514c',
      },
    })
  }

  sendEmail(params: SendMailParams): void {
    const { to, text } = params

    this.transporter.sendMail({
      from: 'Pizza Shop <pizzashop@me.com>',
      to,
      subject: 'Testando o Feedget',
      text,
    })
  }
}
