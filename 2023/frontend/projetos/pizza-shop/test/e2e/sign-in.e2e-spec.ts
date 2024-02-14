import { expect, test } from '@playwright/test'

test('[E2E] SignIn - Success', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const successToast = page.getByText(
    'Enviamos um link de autenticação para seu e-mail.',
  )

  await expect(successToast).toBeVisible()
  // await page.waitForTimeout(1000)
})

test('[E2E] SignIn - Wrong e-mail', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail').fill('wrong@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const errorToast = page.getByText('Email inválido ou inexistente.')

  await expect(errorToast).toBeVisible()
})

test('[E2E] SignIn - Navigate to sign up ', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  await expect(page.url()).toContain('/sign-up')
})
