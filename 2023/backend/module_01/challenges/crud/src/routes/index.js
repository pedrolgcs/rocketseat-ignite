import { randomUUID } from 'node:crypto';
import { db } from '../database/database.js';
import { buildRoutePath } from '../utils/build-route-path.js';

const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { search = '' } = request.query;

      const filter = {
        title: search,
        description: search,
      };

      const tasks = db.select('tasks', filter);

      return response.writeHead(200).end(JSON.stringify(tasks));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { title, description } = request.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      db.insert('tasks', task);

      return response.writeHead(201).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      const { title, description } = request.body;
      const { id } = request.params;

      const task = db.find('tasks', id);

      if (!task) {
        return response
          .writeHead(404)
          .end(JSON.stringify({ error: 'task not found' }));
      }

      const updatedTask = Object.assign(task, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date(),
      });

      db.update('tasks', id, updatedTask);

      return response.writeHead(201).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      const { id } = request.params;

      try {
        db.delete('tasks', id);

        return response.writeHead(204).end();
      } catch (error) {
        return response
          .writeHead(404)
          .end(JSON.stringify({ error: error.message }));
      }
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (request, response) => {
      const { id } = request.params;

      const task = db.find('tasks', id);

      if (!task) {
        return response
          .writeHead(404)
          .end(JSON.stringify({ error: 'task not found' }));
      }

      const updatedTask = Object.assign(task, {
        completed_at: task.completed_at ? null : true,
        updated_at: new Date(),
      });

      db.update('tasks', id, updatedTask);

      return response.writeHead(201).end();
    },
  },
];

export { routes };
