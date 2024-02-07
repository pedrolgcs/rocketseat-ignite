import { Link, useRouteError } from 'react-router-dom'

import { cn } from '@/lib/utils'

export function ErrorPage() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <h1 className="text-4xl font-bold">Whoops, algo aconteceu...</h1>
      <p className="text-accent-foreground">
        Um erro inesperado aconteceu, abaixo você encontra mais detalhes
      </p>
      <pre className="whitespace-pre rounded border border-muted-foreground p-4 text-accent-foreground shadow-lg shadow-slate-900">
        {error?.message || JSON.stringify(error)}
      </pre>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link to="/" className={cn('text-sky-600', 'dark:text-sky-400')}>
          Dashboard
        </Link>
      </p>
    </div>
  )
}
