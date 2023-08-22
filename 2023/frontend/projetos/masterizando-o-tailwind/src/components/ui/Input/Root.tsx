import { cn } from '@/lib/tw-merge'

type RootProps = React.ComponentProps<'div'> & {
  children: React.ReactNode
}

function Root(props: RootProps) {
  return (
    <div
      {...props}
      className={cn(
        'mx-1 flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm',
        props.className,
      )}
    />
  )
}

export { Root }
export type { RootProps }
