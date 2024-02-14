import { expect, test } from '@playwright/test'

test('[E2E] OrdersTable - List orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  expect(
    page.getByRole('cell', {
      name: 'order-1',
      exact: true,
    }),
  ).toBeVisible()

  expect(
    page.getByRole('cell', { name: 'order-10', exact: true }),
  ).toBeVisible()
})

test('[E2E] OrdersTable - Navigate next page', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Próxima página' }).click()

  expect(
    page.getByRole('cell', {
      name: 'order-11',
      exact: true,
    }),
  ).toBeVisible()

  expect(
    page.getByRole('cell', { name: 'order-20', exact: true }),
  ).toBeVisible()
})

test('[E2E] OrdersTable - Navigate to previous  page', async ({ page }) => {
  await page.goto('/orders?page=2', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Página anterior' }).click()

  expect(
    page.getByRole('cell', {
      name: 'order-1',
      exact: true,
    }),
  ).toBeVisible()

  expect(
    page.getByRole('cell', { name: 'order-10', exact: true }),
  ).toBeVisible()
})

test('[E2E] OrdersTable - Filter by order ir', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('10')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(
    page.getByRole('cell', { name: 'order-10', exact: true }),
  ).toBeVisible()
})

test('[E2E] OrdersTable - Filter by client name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('Customer 10')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(
    page.getByRole('cell', { name: 'order-10', exact: true }),
  ).toBeVisible()
})

test('[E2E] OrdersTable - Filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(page.getByRole('cell', { name: 'Pendente' }).first()).toBeVisible()
})
