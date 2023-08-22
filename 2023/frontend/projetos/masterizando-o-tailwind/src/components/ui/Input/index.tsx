import * as React from 'react'

type RootProps = React.ComponentProps<'div'>

function Root(props: RootProps) {
  return (
    <div
      className="mx-1 flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm"
      {...props}
    />
  )
}

type PrefixProps = React.ComponentProps<'div'>

function Prefix(props: PrefixProps) {
  return <div {...props} />
}

type ControlProps = React.ComponentProps<'input'>

function Control(props: ControlProps) {
  return (
    <input
      className="w-full border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600"
      {...props}
    />
  )
}

export { Root, Prefix, Control }
export type { RootProps, ControlProps, PrefixProps }
