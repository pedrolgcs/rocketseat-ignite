import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/formatCurrency'

import { useGetMonthRevenueQuery } from '../../hooks/use-get-month-revenue-query'
import { CardSkeleton } from './card-skeleton'

export function MonthRevenueCard() {
  const { data: monthRevenue, isLoading: isMonthRevenueLoading } =
    useGetMonthRevenueQuery()

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-5 w-5 text-muted-foreground" />
      </CardHeader>

      {isMonthRevenueLoading && (
        <CardContent>
          <CardSkeleton />
        </CardContent>
      )}

      {monthRevenue && (
        <CardContent className="space-y-1">
          <span className="text-2xl font-bold tracking-tight">
            {formatCurrency(monthRevenue.receipt / 100)}
          </span>

          <p className="flex gap-1 text-xs text-muted-foreground">
            {monthRevenue.diffFromLastMonth >= 0 ? (
              <span className={cn('text-emerald-500', 'dark:text-emerald-400')}>
                +{monthRevenue.diffFromLastMonth}%
              </span>
            ) : (
              <span className={cn('text-rose-500', 'dark:text-rose-400')}>
                {monthRevenue.diffFromLastMonth}%
              </span>
            )}
            em relação ao mês passado
          </p>
        </CardContent>
      )}
    </Card>
  )
}
