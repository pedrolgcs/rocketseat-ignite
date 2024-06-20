import { type FormEvent, useState, useTransition } from 'react'

type FormState = {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState<{
    success: boolean
    message: string | null
    errors: Record<string, string[]> | null
  }>(() => {
    if (initialState) return initialState

    return {
      success: false,
      message: null,
      errors: null,
    }
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (onSuccess && state.success) await onSuccess()

      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
