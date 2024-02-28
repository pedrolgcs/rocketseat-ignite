export abstract class SmtpProvider {
  abstract sendEmail(): Promise<void>
}
