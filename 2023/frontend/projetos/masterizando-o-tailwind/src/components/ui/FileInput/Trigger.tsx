'use client'

import * as React from 'react'
import { IconCloudUpload } from '@tabler/icons-react'
import { useFileInput } from './Root'

type TriggerProps = React.ComponentProps<'label'> & {
  children?: React.ReactNode
}

function Trigger({ children }: TriggerProps) {
  const { id } = useFileInput()

  return (
    <label
      htmlFor={id}
      className="hover:bg-violet-25 group flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border border-zinc-300 px-6 py-4 text-center text-zinc-500 shadow-sm transition hover:border-violet-200 hover:text-violet-500"
    >
      <div className="border-6 rounded-full border-zinc-50 bg-zinc-100 p-2 transition group-hover:border-violet-50 group-hover:bg-violet-100">
        <IconCloudUpload className="h-5 w-5 text-zinc-600 transition group-hover:text-violet-600" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-sm">
          <span className="font-semibold text-violet-700">Click to upload</span>{' '}
          or drag and drop
        </span>
        <span className="text-xs">{children}</span>
      </div>
    </label>
  )
}

export { Trigger }
