export {}

declare global {
  interface Pagination {
    page: number
    perPage: number
  }

  type Role = 'ADMIN' | 'MEMBER'
}