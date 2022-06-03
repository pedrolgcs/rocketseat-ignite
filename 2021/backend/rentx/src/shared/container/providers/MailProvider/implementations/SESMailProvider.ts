import fs from 'fs';
import nodemailer, { Transporter } from 'nodemailer';
import { SES } from 'aws-sdk';
import handleBars from 'handlebars';

// dtos
import { ISendMailDTO } from '../dtos/ISendMailDTO';

// interfaces
import { IMailProvider } from '../models/IMailProvider';

class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_MAIL_REGION,
      }),
    });
  }

  public async sendMail({
    to,
    subject,
    variables,
    path,
  }: ISendMailDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handleBars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: 'Rentx <noreplay@rentx.com.br>',
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
