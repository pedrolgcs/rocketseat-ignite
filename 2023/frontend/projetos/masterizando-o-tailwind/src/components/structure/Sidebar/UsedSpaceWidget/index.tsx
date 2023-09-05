import { cn } from '@/lib/tw-merge'

function UsedSpaceWidget() {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-lg bg-violet-50 px-4 py-5',
        'dark:bg-zinc-800',
      )}
    >
      <div className="space-y-1">
        <span
          className={cn(
            'text-sm/5 font-medium text-violet-700',
            'dark:text-zinc-100',
          )}
        >
          Used space
        </span>

        <p className={cn('text-sm/5 text-violet-500', 'dark:text-zinc-200')}>
          Your team has used 80% of your available space. Need more?
        </p>
      </div>

      <div className={cn('h-2 rounded-full bg-violet-100', 'dark:bg-zinc-600')}>
        <div
          className={cn(
            'h-2 w-4/5 rounded-full bg-violet-700',
            'dark:bg-violet-400',
          )}
        ></div>
      </div>

      <div className="space-x-3">
        <button
          type="button"
          className={cn(
            'text-sm font-medium text-violet-500 transition hover:text-violet-700',
            'dark:text-violet-300 dark:hover:text-violet-200',
          )}
        >
          Dismiss
        </button>
        <button
          type="button"
          className={cn(
            'text-sm font-medium text-violet-700 transition hover:text-violet-900',
            'dark:text-zinc-300 dark:hover:text-zinc-100',
          )}
        >
          Upgrade plan
        </button>
      </div>
    </div>
  )
}

export { UsedSpaceWidget }
