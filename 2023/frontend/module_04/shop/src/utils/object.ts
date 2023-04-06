export function classToObject<T = unknown>(classInstance: T) {
  return JSON.parse(JSON.stringify(classInstance));
}
