import { cn } from '@/lib/tw-merge'

type RootProps = React.ComponentProps<'div'> & {
  children: React.ReactNode
}

function Root(props: RootProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm',
        'focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100',
        'dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:border-violet-500 dark:focus-within:ring-violet-500/20',
        props.className,
      )}
    />
  )
}

export { Root }
export type { RootProps }
