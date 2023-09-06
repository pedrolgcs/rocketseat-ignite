'use client'

import * as React from 'react'
import * as Select from '@radix-ui/react-select'
import { cn } from '@/lib/tw-merge'

type ContentProps = React.ComponentProps<typeof Select.Content>

function Content({ children, ...props }: ContentProps) {
  return (
    <Select.Portal>
      <Select.Content
        {...props}
        sideOffset={8}
        side="bottom"
        position="popper"
        className={cn(
          'group z-10 w-[var(--radix-select-trigger-width)] animate-slideDownAndFade rounded-lg border border-zinc-200 bg-white will-change-[opacity,transform]',
          'dark:border-zinc-700 dark:bg-zinc-800',
        )}
      >
        <Select.Viewport className="max-h-72">{children}</Select.Viewport>
      </Select.Content>
    </Select.Portal>
  )
}

export { Content }
export type { ContentProps }
