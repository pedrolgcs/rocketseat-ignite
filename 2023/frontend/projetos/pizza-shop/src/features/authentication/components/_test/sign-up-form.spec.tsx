import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { queryClient } from '@/lib/react-query'

import { SignUpForm } from '../sign-up-form'

describe('[Feature authentication] - SignUpForm', () => {
  it('should be able to set a email input if email is present on search params', () => {
    const wrapper = render(<SignUpForm />, {
      wrapper: ({ children }) => {
        return (
          <MemoryRouter initialEntries={['/sign-up?email=johndoe@example.com']}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        )
      },
    })

    const emailInput = wrapper.getByLabelText('Seu e-mail') as HTMLInputElement

    expect(emailInput.value).toEqual('johndoe@example.com')
  })
})
