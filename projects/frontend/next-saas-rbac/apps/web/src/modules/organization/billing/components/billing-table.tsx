'use client'

import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetBillingQuery } from '@/http/hooks/use-get-billing'
import { formatCurrency } from '@/utils/format-currency'

type BillingTableProps = {
  slug: string
}

export function BillingTable({ slug }: BillingTableProps) {
  const {
    data: billing,
    isLoading: isLoadingOnGetBilling,
    isError: isErrorOnGetBilling,
  } = useGetBillingQuery({ slug })

  if (isLoadingOnGetBilling) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    )
  }

  if (isErrorOnGetBilling) {
    return <p>Error</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableHead>Cost type</TableHead>
        <TableHead className="text-right" style={{ width: 120 }}>
          Quantity
        </TableHead>
        <TableHead className="text-right" style={{ width: 200 }}>
          Subtotal
        </TableHead>
      </TableHeader>

      {billing && (
        <>
          <TableBody>
            <TableRow>
              <TableCell>Amount of projects</TableCell>
              <TableCell className="text-right">
                {billing.projects.amount}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(billing.projects.price)} (
                {formatCurrency(billing.projects.unit)} each)
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Amount of seats</TableCell>
              <TableCell className="text-right">
                {billing.seats.amount}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(billing.seats.price)} (
                {formatCurrency(billing.seats.unit)} each)
              </TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell />
              <TableCell className="text-right">Total</TableCell>
              <TableCell className="text-right">
                {formatCurrency(billing.total)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </>
      )}
    </Table>
  )
}
