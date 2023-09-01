import * as React from 'react'
import { cn } from '@/lib/tw-merge'

type ControlProps = React.ComponentProps<'input'>

function Control(props: ControlProps, ref: React.Ref<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none',
        props.className,
      )}
      ref={ref}
      {...props}
    />
  )
}

const ControlWithRef = React.forwardRef(Control)

export { ControlWithRef as Control }
export type { ControlProps }
