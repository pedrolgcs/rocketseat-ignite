export type Status =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

export type Customer = {
  name: string
  email: string
  phone: string | null
}

export type Item = {
  id: string
  priceInCents: number
  quantity: number
  product: {
    name: string
  }
}

export type Order = {
  orderId: string
  status: Status
  customerName: string
  createdAt: string
  total: number
}

export type OrderDetails = {
  id: string
  status: Status
  totalInCents: number
  customer: Customer
  orderItems: Item[]
  createdAt: string
}
