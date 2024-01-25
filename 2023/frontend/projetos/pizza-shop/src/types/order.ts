export type Status =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

export type Order = {
  orderId: string
  status: Status
  customerName: string
  createdAt: string
  total: number
}
