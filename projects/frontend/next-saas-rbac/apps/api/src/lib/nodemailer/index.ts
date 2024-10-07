import path from 'node:path'

import { env } from '@saas/env'
import nodemailer from 'nodemailer'
import pug from 'pug'

import { MailtrapProvider } from './providers/mailtrap'
import { SESProvider } from './providers/ses'
import type { Templates } from './views'

const VIEWS_PATH = path.resolve(__dirname, 'views')

type SendMailParams = {
  to: {
    name: string
    email: string
  }
  subject: string
  template: Templates
}

const providers = {
  ses: SESProvider,
  mailtrap: MailtrapProvider,
}

class Provider {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = new providers[env.MAIL_PROVIDER]().transporter
  }

  sendEmail(params: SendMailParams): void {
    const { to, subject, template } = params

    this.transporter.sendMail({
      from: 'Next SaaS <saas@me.com>',
      to: to.email,
      subject,
      html: pug.renderFile(
        path.join(VIEWS_PATH, template.file.concat('.pug')),
        template.variables,
      ),
    })
  }
}

export const mailClient = new Provider()
