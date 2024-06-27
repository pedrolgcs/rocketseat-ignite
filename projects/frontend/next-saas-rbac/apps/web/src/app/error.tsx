'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-sm font-medium">{error.message}</p>
        <button
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  )
}
