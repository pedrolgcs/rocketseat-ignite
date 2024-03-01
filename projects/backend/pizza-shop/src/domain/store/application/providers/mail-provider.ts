type Auth = {
  template: 'auth_template'
  variables: {
    link: string
    name: string
  }
}

type SignIn = {
  template: 'signin_template'
  variables: {
    name: string
  }
}

type TemplateData = Auth | SignIn

export type SendMailParams = {
  to: {
    name: string
    email: string
  }
  subject: string
  templateData: TemplateData
}

export abstract class MailProvider {
  abstract sendEmail(params: SendMailParams): void
}
