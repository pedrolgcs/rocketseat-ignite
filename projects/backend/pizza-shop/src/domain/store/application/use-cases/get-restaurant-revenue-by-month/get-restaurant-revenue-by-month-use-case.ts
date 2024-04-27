import dayjs from 'dayjs'

import { Either, right } from '@/core/either'
import { OrdersRepository } from '@/domain/store/application/repositories'

type Request = {
  restaurantId: string
  currentMonth: Date
  startOfLastMonth: Date
}

type Response = Either<
  null,
  {
    revenue: number
    diffFromLastMonth: number
  }
>

export class GetRestaurantRevenueByMonthUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async execute(params: Request): Promise<Response> {
    const { restaurantId, currentMonth, startOfLastMonth } = params

    const currentMonthWithYear = dayjs(currentMonth).format('YYYY-MM')
    const lasMonthWithYear = dayjs(startOfLastMonth).format('YYYY-MM')

    const restaurantMonthsRevenue =
      await this.ordersRepository.getMonthsRevenue({
        restaurantId,
        dateStart: startOfLastMonth,
      })

    const currentMonthRevenue = restaurantMonthsRevenue.find(
      (revenue) => revenue.monthWithYear === currentMonthWithYear,
    )

    const lastMonthRevenue = restaurantMonthsRevenue.find(
      (revenue) => revenue.monthWithYear === lasMonthWithYear,
    )

    const diffFromLastMonth =
      currentMonthRevenue && lastMonthRevenue
        ? Number(
            (
              (currentMonthRevenue.revenue * 100) / lastMonthRevenue.revenue -
              100
            ).toFixed(2),
          )
        : 0

    return right({
      revenue: currentMonthRevenue?.revenue || 0,
      diffFromLastMonth,
    })
  }
}
