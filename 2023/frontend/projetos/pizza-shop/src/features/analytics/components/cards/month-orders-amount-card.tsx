import { Utensils } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { useGetMonthOrdersAmountQuery } from '../../hooks/use-get-mont-orders-amount-query'

export function MonthOrdersAmountCard() {
  const { data: monthOrdersAmount } = useGetMonthOrdersAmountQuery()

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="h-5 w-5 text-muted-foreground" />
      </CardHeader>

      {monthOrdersAmount && (
        <CardContent className="space-y-1">
          <span className="text-2xl font-bold tracking-tight">
            {monthOrdersAmount.amount}
          </span>

          <p className="flex gap-1 text-xs text-muted-foreground">
            {monthOrdersAmount.diffFromLastMonth >= 0 ? (
              <span className={cn('text-emerald-500', 'dark:text-emerald-400')}>
                +${monthOrdersAmount.diffFromLastMonth}%
              </span>
            ) : (
              <span className={cn('text-rose-500', 'dark:text-rose-400')}>
                -{monthOrdersAmount.diffFromLastMonth}%
              </span>
            )}
            em relação ao mês passado
          </p>
        </CardContent>
      )}
    </Card>
  )
}
