import { subDays } from 'date-fns'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'
import { useTheme } from '@/features/theme'
import { formatCurrency } from '@/utils/formatCurrency'

import { useGetDailyRevenueInPeriodQuery } from '../../hooks/use-get-daily-revenue-in-period-query'
import { ChartError } from './chart-error'
import { ChartLoader } from './chart-loader'

const MAX_DATE_RANGE = 7

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), MAX_DATE_RANGE),
    to: new Date(),
  })

  const { theme } = useTheme()

  const {
    data: dailyRevenueInPeriod,
    isLoading: isLoadingRevenueInPeriod,
    isError: isErrorOnGetRevenueInPeriod,
    refetch: refetchRevenueInPeriod,
  } = useGetDailyRevenueInPeriodQuery({
    from: dateRange?.from,
    to: dateRange?.to,
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map((chartItem) => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker
            date={dateRange}
            onDateChange={setDateRange}
            maxRange={MAX_DATE_RANGE}
          />
        </div>
      </CardHeader>

      <CardContent>
        {isErrorOnGetRevenueInPeriod && (
          <ChartError retry={refetchRevenueInPeriod} />
        )}

        {isLoadingRevenueInPeriod && <ChartLoader />}

        {chartData && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                itemStyle={{ fontSize: 16 }}
                contentStyle={{
                  backgroundColor:
                    theme === 'dark' ? colors.zinc[800] : colors.zinc[50],
                }}
              />

              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />

              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) => formatCurrency(value)}
              />

              <CartesianGrid className="stroke-muted" />

              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.violet[500]}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
