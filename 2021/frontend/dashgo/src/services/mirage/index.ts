import {
  createServer,
  Factory,
  Model,
  Response,
  ActiveModelSerializer,
} from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
};

type RouterThis = {
  serialize: (schema: unknown) => any;
};

function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    serializers: {
      application: ActiveModelSerializer,
    },

    factories: {
      user: Factory.extend({
        name() {
          return faker.name.findName();
        },
        email() {
          return faker.internet.email().toLocaleLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    seeds(server) {
      server.createList('user', 5);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      // users
      this.get('/users', function (this: RouterThis, schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const pageAsNumber = Number(page);
        const perPageAsNumber = Number(per_page);

        const total = schema.all('user').length;

        const pageStart = (pageAsNumber - 1) * perPageAsNumber;
        const pageEnd = pageStart + perPageAsNumber;

        const usersSerialize = this.serialize(schema.all('user'));

        const users = usersSerialize.users.slice(pageStart, pageEnd);

        return new Response(
          200,
          {
            'x-total-count': String(total),
          },
          {
            users,
          }
        );
      });

      this.post('/users');

      this.get('/users/:id');

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
}

export { makeServer };
