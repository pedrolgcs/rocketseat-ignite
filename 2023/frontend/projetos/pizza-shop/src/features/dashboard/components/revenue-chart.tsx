import { format } from 'date-fns'
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

import { useTheme } from '@/components/theme/theme-provider'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatCurrency } from '@/utils/formatCurrency'

const data = [
  {
    date: new Date('2024-01-01'),
    revenue: 1200,
  },
  {
    date: new Date('2024-01-02'),
    revenue: 200,
  },
  {
    date: new Date('2024-01-03'),
    revenue: 900,
  },
  {
    date: new Date('2024-01-04'),
    revenue: 750,
  },
  {
    date: new Date('2024-01-05'),
    revenue: 640,
  },
  {
    date: new Date('2024-01-06'),
    revenue: 250,
  },
  {
    date: new Date('2024-01-07'),
    revenue: 430,
  },
]

export function RevenueChart() {
  const { theme } = useTheme()

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <Tooltip
              labelFormatter={(value: Date) => format(value, 'E dd MMM y')}
              formatter={(value: number) => formatCurrency(value)}
              itemStyle={{ fontSize: 16 }}
              contentStyle={{
                backgroundColor:
                  theme === 'dark' ? colors.zinc[800] : colors.zinc[50],
              }}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              dy={16}
              tickFormatter={(value: Date) => format(value, 'dd/MM')}
            />

            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) => formatCurrency(value)}
            />

            <CartesianGrid vertical={false} className="stroke-muted" />

            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
