import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function MonthRevenueCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-5 w-5 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">R$ 1248,60</span>
        <p className="text-xs text-muted-foreground">
          <span className={cn('text-emerald-500', 'dark:text-emerald-400')}>
            +2%
          </span>{' '}
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
