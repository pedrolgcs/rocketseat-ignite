import nodemailer from 'nodemailer'

export class MailtrapProvider {
  private _transporter: nodemailer.Transporter

  constructor() {
    this._transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '74839e351b1aee',
        pass: '92828c40ae0eca',
      },
    })
  }

  get transporter() {
    return this._transporter
  }
}
