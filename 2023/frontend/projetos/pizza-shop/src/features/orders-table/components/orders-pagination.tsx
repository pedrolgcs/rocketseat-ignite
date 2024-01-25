import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

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
}

export function OrdersPagination({
  totalCount,
  pageIndex,
  perPage,
}: OrdersPaginationProps) {
  const currentPage = pageIndex + 1

  const [_, setSearchParams] = useSearchParams()

  const lastPage = Math.ceil(totalCount / perPage)

  const handlePaginate = (page: number) => {
    if (page < 1) return
    if (page > lastPage) return

    setSearchParams((state) => {
      state.set('page', page.toString())

      return state
    })
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
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => handlePaginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => handlePaginate(currentPage + 1)}
            disabled={currentPage === lastPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => handlePaginate(lastPage)}
            disabled={currentPage === lastPage}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
