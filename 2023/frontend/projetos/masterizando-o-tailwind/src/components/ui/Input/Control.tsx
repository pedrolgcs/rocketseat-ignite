import { cn } from '@/lib/tw-merge'

type ControlProps = React.ComponentProps<'input'>

function Control(props: ControlProps) {
  return (
    <input
      className={cn(
        'w-full border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600',
        props.className,
      )}
      {...props}
    />
  )
}

export { Control }
export type { ControlProps }
