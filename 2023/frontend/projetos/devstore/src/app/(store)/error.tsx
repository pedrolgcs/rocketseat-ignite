'use client'

import * as React from 'react'
import { cn } from '@/lib/tw-merge'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error }: ErrorProps) {
  React.useEffect(() => {
    console.log(error.digest)
  }, [error])

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6">
      <h1 className="text-6xl font-bold text-zinc-300">
        Opps! Something went{' '}
        <span className="text-ellipsis underline decoration-rose-800 underline-offset-8">
          wrong
        </span>
      </h1>

      <p className="text-2xl font-semibold text-zinc-400">
        Please try again. If the error persists, please contact support.
      </p>

      <div className="flex items-center justify-center gap-5">
        <button
          className={cn(
            'relative rounded-lg bg-zinc-900 px-4 py-2 text-xl font-bold text-zinc-300',
            'transition-colors duration-300 hover:bg-zinc-800 hover:text-zinc-50',
          )}
          onClick={() => (window.location.href = '/')}
        >
          Back to home
        </button>
      </div>
    </div>
  )
}
