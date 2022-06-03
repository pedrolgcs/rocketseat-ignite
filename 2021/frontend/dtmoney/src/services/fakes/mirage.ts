import { createServer, Model } from 'miragejs';
import { nanoid } from 'nanoid'

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: nanoid(),
          title: 'Sobradinho',
          type: 'deposit',
          category: 'DEV',
          value: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: nanoid(),
          title: 'Gasolina',
          type: 'withdraw',
          category: 'Personal',
          value: 500,
          createdAt: new Date('2021-02-20 13:00:00'),
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  },
});
