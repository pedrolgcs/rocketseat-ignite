interface IMailConfig {
  driver: 'local' | 'ses';
}

export default {
  driver: process.env.MAIL_DRIVER || 'local',
} as IMailConfig;
