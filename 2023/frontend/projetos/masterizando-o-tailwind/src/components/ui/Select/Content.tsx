'use client'

import * as React from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
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
        className="group z-10 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-zinc-200 bg-white will-change-[opacity,transform]"
      >
        <ScrollArea.Root className="h-full w-full" type="auto">
          <ScrollArea.Viewport className="max-h-[300px] w-full overflow-y-scroll">
            {children}
          </ScrollArea.Viewport>

          <ScrollArea.Scrollbar
            className="invisible flex w-2.5 touch-none select-none bg-zinc-100 p-0.5 group-hover:visible"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Select.Content>
    </Select.Portal>
  )
}

export { Content }
export type { ContentProps }
