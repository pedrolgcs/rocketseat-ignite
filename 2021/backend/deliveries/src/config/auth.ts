export default {
  jwt: {
    secret: process.env.TOKEN_SECRET || 'default',
    expiresIn: '1d',
  },
};
