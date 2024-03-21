export type Pagination<T> = {
  items: T[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}
