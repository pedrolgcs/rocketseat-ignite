import dayjs from 'dayjs'

import { Either, left, right } from '@/core/either'

import { OrdersRepository } from '../../repositories'
import { InvalidRevenueDateRangeError } from '../_erros'

type Request = {
  restaurantId: string
  startDate: Date
  endDate: Date
}

type Response = Either<
  InvalidRevenueDateRangeError,
  {
    orders: {
      date: string
      revenue: number
    }[]
  }
>

export class GetDailyRevenueInPeriodUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async execute(params: Request): Promise<Response> {
    const { restaurantId, startDate, endDate } = params

    const from = dayjs(startDate).startOf('day')
    const to = dayjs(endDate).endOf('day')
    const diffInDays = to.diff(from, 'days')

    if (diffInDays > 7) {
      return left(new InvalidRevenueDateRangeError())
    }

    const fromWithUtcOffset = from.add(dayjs(from).utcOffset(), 'minutes')
    const toWithUtcOffset = to.add(dayjs(to).utcOffset(), 'minutes')

    const ordersInPeriod = await this.ordersRepository.getOrdersInPeriod({
      startDate: fromWithUtcOffset.toDate(),
      endDate: toWithUtcOffset.toDate(),
      restaurantId,
    })

    const groupedOrdersByDay = Object.groupBy(ordersInPeriod, (order) => {
      const date = dayjs(order.createdAt)
      const utcMinutes = date.utcOffset()
      const dateWithUTCOffset = date.add(utcMinutes, 'minutes')

      return dateWithUTCOffset.format('YYYY-MM-DD')
    })

    const datesBetweenFromAndTo = Array.from(
      { length: diffInDays + 1 },
      (_, index) => from.add(index, 'days').format('YYYY-MM-DD'),
    )

    const ordersRevenueByDay = datesBetweenFromAndTo.map((date) => {
      const dayOrders = groupedOrdersByDay[date]
      const revenue =
        dayOrders?.reduce((acc, order) => acc + order.totalInCents, 0) || 0

      return {
        date,
        revenue,
      }
    })

    return right({ orders: ordersRevenueByDay })
  }
}
