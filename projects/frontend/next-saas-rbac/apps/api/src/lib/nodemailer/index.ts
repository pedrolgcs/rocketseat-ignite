import path from 'node:path'

import nodemailer from 'nodemailer'
import pug from 'pug'

const VIEWS_PATH = path.resolve(__dirname, 'views')

const PROVIDERS = {
  MAILTRAP: {
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '74839e351b1aee',
      pass: '92828c40ae0eca',
    },
  },
  SES: {},
}

type Providers = keyof typeof PROVIDERS

type SendMemberInvite = {
  file: 'send-member-invite'
  variables: {
    link: string
    organization: string
    name: string
    role: string
  }
}

type Template = SendMemberInvite

export type SendMailParams = {
  to: {
    name: string
    email: string
  }
  subject: string
  template: Template
}

export class Nodemailer {
  private transporter: nodemailer.Transporter

  constructor(provider: Providers) {
    this.transporter = nodemailer.createTransport(PROVIDERS[provider])
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
