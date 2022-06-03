export default {
  jwt: {
    secret: process.env.TOKEN_SECRET || 'default',
    expiresIn: '15m',
  },
  refresh_token: {
    secret: process.env.REFRESH_TOKEN_SECRET || 'default',
    expiresIn: '30d',
    expiresInDays: 30,
  },
};
