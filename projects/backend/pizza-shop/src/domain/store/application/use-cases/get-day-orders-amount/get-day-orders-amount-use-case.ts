import dayjs from 'dayjs'

import { Either, right } from '@/core/either'

import { OrdersRepository } from '../../repositories'

type Request = {
  restaurantId: string
  date: Date
}

type Response = Either<
  null,
  {
    amount: number
    diffFromLastDay: number
  }
>

export class GetDayOrdersAmountUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async execute(params: Request): Promise<Response> {
    const { restaurantId, date } = params

    const day = dayjs(date)
    const yesterday = day.subtract(1, 'day').startOf('day')

    const ordersPerDay = await this.ordersRepository.getOrdersPerDay({
      restaurantId,
      startFrom: yesterday.toDate(),
    })

    const dayWithMonthAndYear = day.format('YYYY-MM-DD')
    const yesterdayWithMonthAndYear = yesterday.format('YYYY-MM-DD')

    const dayOrders = ordersPerDay.find(
      (orderPerDay) => orderPerDay.dayWithMonthAndYear === dayWithMonthAndYear,
    )

    const yesterdayOrders = ordersPerDay.find(
      (orderPerDay) =>
        orderPerDay.dayWithMonthAndYear === yesterdayWithMonthAndYear,
    )

    const diffFromLastDay =
      dayOrders && yesterdayOrders
        ? (dayOrders.amount - yesterdayOrders.amount) / yesterdayOrders.amount
        : 0

    const diffFromLastDayPercentage = Number((diffFromLastDay * 100).toFixed(2))

    return right({
      amount: dayOrders?.amount ?? 0,
      diffFromLastDay: diffFromLastDayPercentage,
    })
  }
}
