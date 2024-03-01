import path from 'node:path'

import nodemailer from 'nodemailer'
import pug from 'pug'

import {
  MailProvider,
  SendMailParams,
} from '@/domain/store/application/providers'

const VIEWS_PATH = path.resolve(__dirname, 'views')

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
    const { to, subject, template } = params

    this.transporter.sendMail({
      from: 'Pizza Shop <pizzashop@me.com>',
      to: to.email,
      subject,
      html: pug.renderFile(
        path.join(VIEWS_PATH, template.file.concat('.pug')),
        template.variables,
      ),
    })
  }
}
