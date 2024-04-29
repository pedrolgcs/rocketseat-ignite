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
    diffFromLastMonth: number
    amount: number
  }
>

export class GetMonthCanceledOrdersAmountUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async execute(params: Request): Promise<Response> {
    const { date, restaurantId } = params

    const month = dayjs(date)
    const lastMonth = month.subtract(1, 'month').startOf('month')

    const canceledOrders =
      await this.ordersRepository.getCanceledOrdersPerMonth({
        restaurantId,
        startFrom: lastMonth.toDate(),
      })

    const monthWithYear = month.format('YYYY-MM')
    const lastMonthWithYear = lastMonth.format('YYYY-MM')

    const monthOrders = canceledOrders.find(
      (orderPerMonth) => orderPerMonth.monthWithYear === monthWithYear,
    )

    const lastMonthOrders = canceledOrders.find(
      (orderPerMonth) => orderPerMonth.monthWithYear === lastMonthWithYear,
    )

    const diffFromLastMonth =
      monthOrders && lastMonthOrders
        ? (monthOrders.amount - lastMonthOrders.amount) / lastMonthOrders.amount
        : 0

    const diffFromLastMonthPercentage = Number(
      (diffFromLastMonth * 100).toFixed(2),
    )

    return right({
      amount: monthOrders?.amount ?? 0,
      diffFromLastMonth: diffFromLastMonthPercentage,
    })
  }
}
