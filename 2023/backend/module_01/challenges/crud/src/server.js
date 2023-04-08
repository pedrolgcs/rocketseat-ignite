import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes/index.js';
import { extractQueryParams } from './utils/extract-query-params.js';
import appConfig from './config/application.js';

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  // middlewares
  await json(request, response);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (!route) return response.writeHead(404).end();

  const routeParams = url.match(route.path);

  const { query, ...params } = routeParams.groups;

  request.params = params;
  request.query = query ? extractQueryParams(query) : {};

  return route.handler(request, response);
});

server.listen(appConfig.PORT, () =>
  console.log(`🚀 Server running on PORT: ${appConfig.PORT}`)
);
