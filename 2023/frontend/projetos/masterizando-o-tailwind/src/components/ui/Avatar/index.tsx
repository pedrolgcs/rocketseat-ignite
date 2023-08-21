'use client'

import * as RadixAvatar from '@radix-ui/react-avatar'

type AvatarProps = React.HTMLProps<HTMLDivElement>

function Avatar({ className }: AvatarProps) {
  return (
    <RadixAvatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full">
      <RadixAvatar.Image
        className="h-full w-full object-cover"
        src="https://github.com/pedrolgcs.png"
        alt="Pedro H."
      />

      <RadixAvatar.Fallback className="flex h-full w-full items-center justify-center bg-zinc-100 font-medium text-violet-500">
        PH
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

export { Avatar }
