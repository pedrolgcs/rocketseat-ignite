import { cn } from '@/lib/tw-merge'

type PrefixProps = React.ComponentProps<'div'> & {
  children: React.ReactNode
}

function Prefix(props: PrefixProps) {
  return <div {...props} className={cn('', props.className)} />
}

export { Prefix }
export type { PrefixProps }
