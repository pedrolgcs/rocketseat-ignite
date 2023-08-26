'use client'

import * as React from 'react'
import * as Select from '@radix-ui/react-select'

type ContentProps = React.ComponentProps<typeof Select.Content>

function Content({ children, ...props }: ContentProps) {
  return (
    <Select.Portal>
      <Select.Content
        {...props}
        sideOffset={8}
        side="bottom"
        position="popper"
        className="group z-10 w-[var(--radix-select-trigger-width)] rounded-lg border border-zinc-200 bg-white will-change-[opacity,transform]"
      >
        <Select.Viewport className="max-h-[300px]">{children}</Select.Viewport>
      </Select.Content>
    </Select.Portal>
  )
}

export { Content }
export type { ContentProps }
