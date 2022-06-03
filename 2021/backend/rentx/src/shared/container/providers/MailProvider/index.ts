import { container } from 'tsyringe';

// config
import mailConfig from '@config/mail';

// Implementations
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SESMailProvider } from './implementations/SESMailProvider';

// interface
import { IMailProvider } from './models/IMailProvider';

const providers = {
  local: new EtherealMailProvider(),
  ses: new SESMailProvider(),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
