import { DayOrdersAmountCard } from './cards/day-orders-amount-card'
import { MonthCanceledOrdersAmountCard } from './cards/month-canceled-orders-amount-card'
import { MonthOrdersAmountCard } from './cards/month-orders-amount-card'
import { MonthRevenueCard } from './cards/month-revenue-card'
import { PopularProductsChart } from './charts/popular-products-chart'
import { RevenueChart } from './charts/revenue-chart'

export function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-4">
        <MonthRevenueCard />
        <MonthOrdersAmountCard />
        <DayOrdersAmountCard />
        <MonthCanceledOrdersAmountCard />
      </div>

      <div className="grid grid-cols-9 gap-4">
        <RevenueChart />
        <PopularProductsChart />
      </div>
    </div>
  )
}
