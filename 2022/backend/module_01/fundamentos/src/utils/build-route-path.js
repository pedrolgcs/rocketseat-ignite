export function buildRoutePath(path) {
  const routerRegex = /:([a-zA-Z]+)/g;

  const pathWithParams = path.replaceAll(routerRegex, '(?<$1>[a-z0-9-_]+)');

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;
}
