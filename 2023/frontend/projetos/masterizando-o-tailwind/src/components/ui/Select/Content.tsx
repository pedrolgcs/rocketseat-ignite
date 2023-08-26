'use client'

import * as React from 'react'
import * as RadixScrollArea from '@radix-ui/react-scroll-area'
import * as RadixSelect from '@radix-ui/react-select'

type ContentProps = React.ComponentProps<typeof RadixSelect.Content>

function Content({ children, ...props }: ContentProps) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        {...props}
        sideOffset={8}
        side="bottom"
        position="popper"
        className="animate-slideUpAndFade group z-10 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-zinc-200 bg-white will-change-[opacity,transform]"
      >
        <RadixScrollArea.Root className="h-full w-full" type="auto">
          <RadixSelect.Viewport className="max-h-[300px]" asChild>
            <RadixScrollArea.Viewport className="h-full w-full overflow-y-scroll">
              {children}
            </RadixScrollArea.Viewport>
          </RadixSelect.Viewport>

          <RadixScrollArea.Scrollbar
            className="invisible flex w-2.5 touch-none select-none bg-zinc-100 p-0.5 group-hover:visible"
            orientation="vertical"
          >
            <RadixScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
          </RadixScrollArea.Scrollbar>
        </RadixScrollArea.Root>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  )
}

export { Content }
export type { ContentProps }
