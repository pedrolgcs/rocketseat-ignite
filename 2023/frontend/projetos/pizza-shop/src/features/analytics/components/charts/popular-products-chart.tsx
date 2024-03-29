import { BarChart } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useGetPopularProductsQuery } from '../../hooks/use-get-popular-products-query'
import { ChartError } from './chart-error'
import { ChartLoader } from './chart-loader'

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

type RenderLabelParams = {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  value: number
  index: number
}

const renderLabel = (
  variables: RenderLabelParams,
  data: { product: string; amount: number }[],
) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, value, index } = variables
  const RADIAN = Math.PI / 180
  const radius = 12 + innerRadius + (outerRadius - innerRadius)
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      className="fill-muted-foreground text-xs"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {data[index].product.length > 12
        ? data[index].product.substring(0, 12).concat('...')
        : data[index].product}{' '}
      ({value})
    </text>
  )
}

export function PopularProductsChart() {
  const {
    data: popularProducts,
    isLoading: isLoadingPopularProducts,
    isError: isErrorOnGetPopularProducts,
    refetch: refetchPopularProducts,
  } = useGetPopularProductsQuery()

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>
          <BarChart className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        {isErrorOnGetPopularProducts && (
          <ChartError retry={refetchPopularProducts} />
        )}

        {isLoadingPopularProducts && <ChartLoader />}

        {popularProducts && (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={popularProducts}
                dataKey="amount"
                nameKey="product"
                cx="50%"
                cy="50%"
                outerRadius={86}
                innerRadius={64}
                strokeWidth={8}
                labelLine={false}
                label={(variables) => renderLabel(variables, popularProducts)}
              >
                {popularProducts.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-card transition-opacity hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
