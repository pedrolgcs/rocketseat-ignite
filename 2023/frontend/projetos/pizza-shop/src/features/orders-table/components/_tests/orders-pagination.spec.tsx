import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

import { OrdersPagination } from '../orders-pagination'

const onPageChangeCallback = vi.fn()

describe('[Feature OrdersTable] - OrdersPagination', () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear()
  })

  it('should display the right amount of pages and results', () => {
    const wrapper = render(
      <OrdersPagination
        pageIndex={0}
        perPage={10}
        totalCount={100}
        onPageChange={onPageChangeCallback}
      />,
      { wrapper: BrowserRouter },
    )

    const currentPageLabel = wrapper.getByText('Página 1 de 10')

    expect(currentPageLabel).toBeInTheDocument()
  })

  it('should be able to navigate to the next page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <OrdersPagination
        pageIndex={0}
        perPage={10}
        totalCount={100}
        onPageChange={onPageChangeCallback}
      />,
      { wrapper: BrowserRouter },
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Próxima página',
    })

    await user.click(nextPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(2)
  })

  it('should be able to navigate to the previous page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <OrdersPagination
        pageIndex={1}
        perPage={10}
        totalCount={100}
        onPageChange={onPageChangeCallback}
      />,
      { wrapper: BrowserRouter },
    )

    const previousPageButton = wrapper.getByRole('button', {
      name: 'Página anterior',
    })

    await user.click(previousPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to the first page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <OrdersPagination
        pageIndex={2}
        perPage={10}
        totalCount={100}
        onPageChange={onPageChangeCallback}
      />,
      { wrapper: BrowserRouter },
    )

    const firstPageButton = wrapper.getByRole('button', {
      name: 'Página inicial',
    })

    await user.click(firstPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to the last page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <OrdersPagination
        pageIndex={2}
        perPage={10}
        totalCount={100}
        onPageChange={onPageChangeCallback}
      />,
      { wrapper: BrowserRouter },
    )

    const lastPageButton = wrapper.getByRole('button', {
      name: 'Última página',
    })

    await user.click(lastPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(10)
  })

  it('should not be able to navigate to the previous page when on the first page', () => {
    const wrapper = render(
      <OrdersPagination
        pageIndex={0}
        perPage={10}
        totalCount={100}
        onPageChange={onPageChangeCallback}
      />,
      { wrapper: BrowserRouter },
    )

    const previousPageButton = wrapper.getByRole('button', {
      name: 'Página anterior',
    })

    expect(previousPageButton).toBeDisabled()
  })

  it('should not be able to navigate to the next page when on the last page', () => {
    const wrapper = render(
      <OrdersPagination
        pageIndex={9}
        perPage={10}
        totalCount={100}
        onPageChange={onPageChangeCallback}
      />,
      { wrapper: BrowserRouter },
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Próxima página',
    })

    expect(nextPageButton).toBeDisabled()
  })
})
