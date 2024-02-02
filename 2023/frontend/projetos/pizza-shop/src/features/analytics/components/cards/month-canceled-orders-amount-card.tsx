import { AlertOctagon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { useGetMonthCanceledOrdersAmountQuery } from '../../hooks/use-get-month-canceled-orders-amount-query'
import { CardError } from './card-error'
import { CardSkeleton } from './card-skeleton'

export function MonthCanceledOrdersAmountCard() {
  const {
    data: monthCanceledOrdersAmount,
    isLoading: isLoadingOnGetMonthCanceledOrdersAmount,
    isError: isErrorOnGetMonthCanceledOrdersAmount,
    refetch: refetchMonthCanceledOrdersAmount,
  } = useGetMonthCanceledOrdersAmountQuery()

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <AlertOctagon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        {isErrorOnGetMonthCanceledOrdersAmount && (
          <CardError retry={refetchMonthCanceledOrdersAmount} />
        )}

        {isLoadingOnGetMonthCanceledOrdersAmount && <CardSkeleton />}

        {monthCanceledOrdersAmount && (
          <div className="space-y-1">
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>

            <p className="flex gap-1 text-xs text-muted-foreground">
              {monthCanceledOrdersAmount.diffFromLastMonth <= 0 ? (
                <span
                  className={cn('text-emerald-500', 'dark:text-emerald-400')}
                >
                  {monthCanceledOrdersAmount.diffFromLastMonth}%
                </span>
              ) : (
                <span className={cn('text-rose-500', 'dark:text-rose-400')}>
                  +{monthCanceledOrdersAmount.diffFromLastMonth}%
                </span>
              )}
              em relação ao mês passado
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
