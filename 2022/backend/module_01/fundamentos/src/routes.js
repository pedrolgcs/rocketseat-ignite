import crypto from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';
import { Database } from './database.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (request, response) => {
      const { search } = request.query;

      const users = database.select('users', {
        name: search ?? '',
        email: search ?? '',
      });

      return response.writeHead(200).end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (request, response) => {
      const { name, email } = request.body;

      const user = {
        id: crypto.randomUUID(),
        name,
        email,
      };

      database.insert('users', user);

      return response.writeHead(201).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (request, response) => {
      const { id } = request.params;
      const { name, email } = request.body;

      try {
        database.update('users', id, { name, email });
        return response.writeHead(201).end();
      } catch (error) {
        const jsonError = JSON.stringify({
          error: error.message,
        });

        return response.writeHead(400).end(jsonError);
      }
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (request, response) => {
      const { id } = request.params;

      try {
        database.delete('users', id);
        return response.writeHead(204).end();
      } catch (error) {
        const jsonError = JSON.stringify({
          error: error.message,
        });

        return response.writeHead(400).end(jsonError);
      }
    },
  },
];
