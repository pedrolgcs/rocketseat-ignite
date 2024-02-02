import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function OrderRowSkeleton() {
  const items = Array.from({ length: 10 }).map((_, i) => i)

  return (
    <>
      {items.map((i) => (
        <TableRow key={i}>
          <TableCell>
            <Button disabled variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[172px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[90px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[64px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[92px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[92px]" />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
