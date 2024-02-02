import { Utensils } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { useGetDayOrdersAmountQuery } from '../../hooks/use-get-day-orders-amount-query'
import { CardError } from './card-error'
import { CardSkeleton } from './card-skeleton'

export function DayOrdersAmountCard() {
  const {
    data: dayOrdersAmount,
    isLoading: isLoadingOnGetDayOrdersAmount,
    isError: isErrorOnGetDayOrdersAmount,
    refetch: refetchDayOrdersAmount,
  } = useGetDayOrdersAmountQuery()

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-5 w-5 text-muted-foreground" />
      </CardHeader>

      {isErrorOnGetDayOrdersAmount && (
        <CardContent>
          <CardError retry={refetchDayOrdersAmount} />
        </CardContent>
      )}

      {isLoadingOnGetDayOrdersAmount && (
        <CardContent>
          <CardSkeleton />
        </CardContent>
      )}

      {dayOrdersAmount && (
        <CardContent className="space-y-1">
          <span className="text-2xl font-bold tracking-tight">
            {dayOrdersAmount.amount.toLocaleString('pt-BR')}
          </span>

          <p className="flex gap-1 text-xs text-muted-foreground">
            {dayOrdersAmount.diffFromYesterday >= 0 ? (
              <span className={cn('text-emerald-500', 'dark:text-emerald-400')}>
                +{dayOrdersAmount.diffFromYesterday}%
              </span>
            ) : (
              <span className={cn('text-rose-500', 'dark:text-rose-400')}>
                {dayOrdersAmount.diffFromYesterday}%
              </span>
            )}
            em relação ontem
          </p>
        </CardContent>
      )}
    </Card>
  )
}
