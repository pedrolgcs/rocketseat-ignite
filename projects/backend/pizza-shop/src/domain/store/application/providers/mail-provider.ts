type AuthTemplate = {
  file: 'auth_template'
  variables: {
    link: string
    name: string
  }
}

type SignInTemplate = {
  file: 'reset_password_template'
  variables: {
    link: string
    email: string
  }
}

type Template = AuthTemplate | SignInTemplate

export type SendMailParams = {
  to: {
    name: string
    email: string
  }
  subject: string
  template: Template
}

export abstract class MailProvider {
  abstract sendEmail(params: SendMailParams): void
}
