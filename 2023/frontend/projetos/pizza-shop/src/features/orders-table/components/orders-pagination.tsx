import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'

type OrdersPaginationProps = {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => void
}

export function OrdersPagination({
  totalCount,
  pageIndex,
  perPage,
  onPageChange,
}: OrdersPaginationProps) {
  const currentPage = pageIndex + 1

  const lastPage = Math.ceil(totalCount / perPage)

  const handlePaginate = (page: number) => {
    if (page < 1) return
    if (page > lastPage) return
    return onPageChange(page)
  }

  return (
    <Pagination className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <PaginationContent>
        <PaginationItem className="text-sm text-muted-foreground">
          Página {currentPage} de {lastPage}
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => handlePaginate(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Página Inicial</span>
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => handlePaginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página Anterior</span>
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => handlePaginate(currentPage + 1)}
            disabled={currentPage === lastPage}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima Página</span>
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => handlePaginate(lastPage)}
            disabled={currentPage === lastPage}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última Página</span>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
